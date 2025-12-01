import { Command } from "../classes/Command";
import { Database } from "../db/db";
import {
  formatLargeNumber,
  formatChange,
  getTrendEmoji,
  formatRelativeTime,
} from "../lib/formatters";

export default new Command(
  "overview",
  "general overview of neptune data",
  async (ctx) => {
    const [price, marketCap, volume, priceChange] = await Promise.all([
      Database.getPrice(),
      Database.getMarketCap(),
      Database.getVolume(),
      Database.getPriceChange(),
    ]);

    const missingData = [];
    if (!price) missingData.push("price");
    if (!marketCap) missingData.push("market cap");
    if (!volume) missingData.push("volume");
    if (!priceChange) missingData.push("price changes");

    if (missingData.length > 0) {
      ctx.reply(
        `Some data is not available at the moment: ${missingData.join(", ")}.`
      );
      return;
    }

    const trendEmoji = getTrendEmoji(priceChange!.value.day);

    ctx.replyWithHTML(
      `${trendEmoji} <b>Neptune Privacy (XNT) Overview</b>

💵 <b>Current Price:</b> <code>$${price!.value.toFixed(6)}</code>

📊 <b>Market Data:</b>
• Market Cap: <code>${formatLargeNumber(marketCap!.value, "$")}</code>
• Trading Volume (24h): <code>${formatLargeNumber(volume!.value, "$")}</code>

📈 <b>Price Changes:</b>
• 1 Hour: <code>${formatChange(priceChange!.value.hour)}</code>
• 24 Hours: <code>${formatChange(priceChange!.value.day)}</code>
• 7 Days: <code>${formatChange(priceChange!.value.week)}</code>

🕐 <i>Last updated ${formatRelativeTime(
        Math.min(
          price!.lastUpdated,
          marketCap!.lastUpdated,
          volume!.lastUpdated,
          priceChange!.lastUpdated
        )
      )}</i>
        `
    );
  }
);
