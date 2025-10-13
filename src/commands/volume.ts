import { Command } from "../classes/Command";
import { Database } from "../db/db";
import { formatLargeNumber, formatRelativeTime } from "../lib/formatters";

export default new Command(
  "volume",
  "get the current trading volume of Neptune",
  async (ctx) => {
    const volume = await Database.getVolume();
    if (!volume) {
      ctx.reply("Volume data is not available at the moment.");
      return;
    }

    ctx.replyWithHTML(
      `<b>Neptune Cash (NPT)</b>
📈 Trading Volume (24h): <code>${formatLargeNumber(volume.value, "$")}</code>
🔢 Raw Volume: <code>${formatLargeNumber(volume.value, "$")}</code>

🕐 <i>Last updated ${formatRelativeTime(volume.lastUpdated)}</i>
        `
    );
  }
);
