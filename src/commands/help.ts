import { Command } from "../classes/Command";

export default new Command(
  "help",
  "Show all available commands",
  async (ctx) => {
    ctx.replyWithHTML(
      `🤖 <b>Neptune Privacy Price Bot Commands</b>

📋 <b>Available Commands:</b>

💵 <code>/price</code> - Get the current price of Neptune Privacy
📊 <code>/marketcap</code> - Get the current market cap of Neptune Privacy
📈 <code>/volume</code> - Get the current trading volume of Neptune Privacy
📉 <code>/change</code> - Get the price change information for Neptune Privacy
🚀 <code>/overview</code> - General overview of Neptune data
📂 <code>/source</code> - Get the source code repository for this bot
❓ <code>/help</code> - Show this help message
        `
    );
  }
);
