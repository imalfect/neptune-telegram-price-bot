import { Command } from "../classes/Command";

export default new Command(
  "source",
  "Get the source code repository for this bot",
  async (ctx) => {
    ctx.replyWithHTML(
      `📂 <b>Source Code</b>

🔗 This bot's source code is available at:
<a href="https://github.com/imalfect/neptune-telegram-price-bot">github.com/imalfect/neptune-telegram-price-bot</a>
        `
    );
  }
);
