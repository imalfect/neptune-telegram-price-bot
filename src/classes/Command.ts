import type { CommandClass, MessageContext } from "../types/command";

export class Command implements CommandClass {
  private command: string;
  private description: string;
  private handler: (ctx: MessageContext) => void;
  constructor(
    command: string,
    description: string,
    handler: (ctx: MessageContext) => void
  ) {
    this.command = command;
    this.description = description;
    this.handler = handler;
  }
  getCommand = () => this.command;
  getDescription = () => this.description;
  execute = (ctx: MessageContext) => this.handler(ctx);
}
