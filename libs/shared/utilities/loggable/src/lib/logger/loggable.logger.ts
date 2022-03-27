import { ConsoleLogger } from '@nestjs/common';

export class LoggableLogger extends ConsoleLogger {
  public setContext(context: string): void {
    this.context = context;
  }
}
