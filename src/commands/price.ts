import { Command } from "../classes/Command";
import { Database } from "../db/db";
import { formatRelativeTime } from "../lib/formatters";

export default new Command(
  "price",
  "get the current price of a Neptune",
  async (ctx) => {
    const price = await Database.getPrice();
    if (!price) {
      ctx.reply("Price data is not available at the moment.");
      return;
    }
    ctx.replyWithHTML(
      `<b>Neptune Cash (NPT)</b>
💵 <code>${price.value.toFixed(6)}</code> USD

🕐 <i>Last updated ${formatRelativeTime(price.lastUpdated)}</i>
        `
    );
  }
);
