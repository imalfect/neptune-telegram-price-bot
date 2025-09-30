import type { Context } from "telegraf";
import type { Message, Update } from "telegraf/types";

export type MessageContext = Context<{
  message: Update.New & Update.NonChannel & Message.TextMessage;
  update_id: number;
}> &
  Omit<Context<Update>, keyof Context<Update>>;

export interface CommandClass {
  getCommand: () => string;
  getDescription: () => string;
  execute: (ctx: MessageContext) => void;
}
