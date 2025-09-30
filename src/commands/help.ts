import { Command } from "../classes/Command";

export default new Command(
  "help",
  "Show all available commands",
  async (ctx) => {
    ctx.replyWithHTML(
      `🤖 <b>Neptune Cash Bot Commands</b>

📋 <b>Available Commands:</b>

💵 <code>/price</code> - Get the current price of Neptune
📊 <code>/marketcap</code> - Get the current market cap of Neptune
📈 <code>/volume</code> - Get the current trading volume of Neptune
📉 <code>/change</code> - Get the price change information for Neptune
🚀 <code>/overview</code> - General overview of Neptune data
📂 <code>/source</code> - Get the source code repository for this bot
❓ <code>/help</code> - Show this help message
        `
    );
  }
);
