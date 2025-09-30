import { glob } from "glob";
import { Telegraf } from "telegraf";
import * as path from "path";
import type { Command } from "./classes/Command";
import "./cron/priceData.ts";

if (!process.env.BOT_TOKEN) {
  throw new Error("BOT_TOKEN is not defined in .env");
}

export const bot = new Telegraf(process.env.BOT_TOKEN || "");

// load commands
const commandFiles = await glob(
  path.join(import.meta.dirname, "commands/*.ts")
);

console.log(`Loading ${commandFiles.length} command[s]...`);
for (const file of commandFiles) {
  console.log(`Loading command from file: ${file}`);
  const commandModule = await import(file);
  if (commandModule.default) {
    console.log(`Loaded command: /${commandModule.default.getCommand()}`);
    const command: Command = commandModule.default;
    bot.command(command.getCommand(), (ctx) => command.execute(ctx));
  }
}
// start bot
bot.launch();
