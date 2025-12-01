import { ofetch } from "ofetch";
import { Command } from "../classes/Command";
import { Database } from "../db/db";
import { formatLargeNumber, formatRelativeTime } from "../lib/formatters";

export default new Command(
  "supply",
  "get the current supply volume of Neptune",
  async (ctx) => {
    const supplyData = await ofetch<{
      overview: {
        total_reward: string;
      };
    }>("https://neptune.vxb.ai/api/overview").catch((e) => {
      console.error("Error fetching circulating supply:", e);
      return null;
    });
    const supply = supplyData
      ? Number(BigInt(supplyData.overview.total_reward) / 2n / 10n ** 30n)
      : 0;

    ctx.replyWithHTML(
      `<b>Neptune Privacy (XNT) Supply</b>
🔢 Total Supply: <code>${formatLargeNumber(supply)}</code>
🕐 <i>Live data from RPC</i>
        `
    );
  }
);
