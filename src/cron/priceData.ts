import { CronJob } from "cron";
import { ofetch } from "ofetch";
import { type PriceData } from "../types/coinpaprika";
import { Database } from "../db/db";

const job = new CronJob(
  "*/3 * * * *", // cronTime
  getPriceData, // onTick
  null, // onComplete
  true, // start
  "America/Los_Angeles" // timeZone
);

job.start();

async function getPriceData() {
  const priceData = await ofetch<PriceData>(
    "https://api.coinpaprika.com/v1/tickers/npt-neptune-cash"
  ).catch((e) => {
    console.error("Error fetching price data:", e);
    return null;
  });
  const circulatingSupply = await ofetch<number>(
    "https://neptunefundamentals.org/rpc/circulating_supply"
  ).catch((e) => {
    console.error("Error fetching circulating supply:", e);
    return null;
  });
  if (!priceData || !circulatingSupply) return;

  console.log("Fetched price data");
  if (!priceData || !priceData.quotes || !priceData.quotes.USD) {
    console.error("Invalid price data received");
    return;
  }
  await Database.setPrice(priceData.quotes.USD.price);
  await Database.setMarketCap(priceData.quotes.USD.price * circulatingSupply);
  await Database.setVolume(priceData.quotes.USD.volume_24h);
  await Database.setPriceChange({
    hour: priceData.quotes.USD.percent_change_1h,
    day: priceData.quotes.USD.percent_change_24h,
    week: priceData.quotes.USD.percent_change_7d,
  });
  console.log("Updated price data in database");
}
