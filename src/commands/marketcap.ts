import { Command } from "../classes/Command";
import { Database } from "../db/db";
import { formatLargeNumber, formatRelativeTime } from "../lib/formatters";

export default new Command(
  "marketcap",
  "get the current market cap of Neptune",
  async (ctx) => {
    const marketCap = await Database.getMarketCap();
    if (!marketCap) {
      ctx.reply("Market cap data is not available at the moment.");
      return;
    }

    ctx.replyWithHTML(
      `<b>Neptune Cash (NPT)</b>
📊 Market Cap: <code>${formatLargeNumber(marketCap.value)}</code>
💰 Raw Value: <code>$${marketCap.value.toLocaleString()}</code>

🕐 <i>Last updated ${formatRelativeTime(marketCap.lastUpdated)}</i>
        `
    );
  }
);
