import { Command } from "../classes/Command";
import { Database } from "../db/db";
import { formatChange, formatRelativeTime } from "../lib/formatters";

export default new Command(
  "change",
  "get the price change information for Neptune",
  async (ctx) => {
    const priceChange = await Database.getPriceChange();
    if (!priceChange) {
      ctx.reply("Price change data is not available at the moment.");
      return;
    }

    ctx.replyWithHTML(
      `<b>Neptune Cash (NPT) Price Changes</b>

⏰ <b>1 Hour:</b> <code>${formatChange(priceChange.value.hour)}</code>
📅 <b>24 Hours:</b> <code>${formatChange(priceChange.value.day)}</code>
📊 <b>7 Days:</b> <code>${formatChange(priceChange.value.week)}</code>

🕐 <i>Last updated ${formatRelativeTime(priceChange.lastUpdated)}</i>
        `
    );
  }
);
