import { ofetch } from "ofetch";
import { Command } from "../classes/Command";
import { Database } from "../db/db";
import { formatLargeNumber, formatRelativeTime } from "../lib/formatters";

export default new Command(
  "supply",
  "get the current supply volume of Neptune",
  async (ctx) => {
    const circulatingSupply = await ofetch<number>(
      "https://neptunefundamentals.org/rpc/circulating_supply"
    );
    const totalSupply = await ofetch<number>(
      "https://neptunefundamentals.org/rpc/total_supply"
    );

    ctx.replyWithHTML(
      `<b>Neptune Cash (NPT) Supply</b>
📈 Cirulating Supply: <code>${formatLargeNumber(circulatingSupply)}</code>
🔢 Total Supply: <code>${formatLargeNumber(totalSupply)}</code>
🕐 <i>Live data from RPC</i>
        `
    );
  }
);
