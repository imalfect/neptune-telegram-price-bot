import { CronJob } from "cron";
import { ofetch } from "ofetch";
import { type PriceData } from "../types/coinpaprika";
import { Database } from "../db/db";

const job = new CronJob(
  "*/6 * * * *", // cronTime
  getPriceData, // onTick
  null, // onComplete
  true, // start
  "America/Los_Angeles" // timeZone
);

job.start();

async function getPriceData() {
  const priceData = await ofetch<PriceData>(
    "https://api.coinpaprika.com/v1/tickers/xnt-neptune-privacy"
  ).catch((e) => {
    console.error("Error fetching price data:", e);
    return null;
  });
  const supplyData = await ofetch<{
    overview: {
      total_reward: string;
    };
  }>("http://161.97.150.88:3001/api/overview").catch((e) => {
    console.error("Error fetching circulating supply:", e);
    return null;
  });
  const supply = supplyData
    ? BigInt(supplyData.overview.total_reward) / 10n ** 30n
    : null;

  if (!priceData || !supply) return;
  console.log("Fetched price data");
  if (!priceData || !priceData.quotes || !priceData.quotes.USD) {
    console.error("Invalid price data received");
    return;
  }
  await Database.setPrice(priceData.quotes.USD.price);
  await Database.setMarketCap(priceData.quotes.USD.price * Number(supply));
  await Database.setVolume(priceData.quotes.USD.volume_24h);
  await Database.setPriceChange({
    hour: priceData.quotes.USD.percent_change_1h,
    day: priceData.quotes.USD.percent_change_24h,
    week: priceData.quotes.USD.percent_change_7d,
  });
  console.log("Updated price data in database");
}
