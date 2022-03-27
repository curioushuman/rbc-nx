import { LoggableLogger } from '..';

// TODO
// [ ] support non-abstract classes

// The interface matching the changes applied by the class decorator
export interface LoggableClass {
  logger: LoggableLogger;
  currentContext(context?: string): string;
  setContext(context: string): void;
  handleError(error: Error, context: string): void;
  handleInfo(info: string, context: string): void;
}

// A basic class constructor for type checking
type Constructor = abstract new (...args: any[]) => any;

// Class decorator
export function Loggable<T extends Constructor>(context?: string) {
  return (Base: T) => {
    abstract class LoggableBase extends Base {
      constructor(...args: any[]) {
        super(...args);
      }
    }
    return LoggableFactory<Constructor>(LoggableBase, context);
  };
}

function LoggableFactory<TBase extends Constructor>(
  Base: TBase,
  context?: string,
) {
  abstract class LoggableBase extends Base implements LoggableClass {
    public logger: LoggableLogger;

    constructor(...args: any[]) {
      super(...args);
      this.logger = new LoggableLogger(this.currentContext(context), {
        timestamp: true,
      });
    }

    currentContext(context?: string): string {
      let currentContext = this.constructor.name;
      if (context) {
        currentContext += `:${context}`;
      }
      return currentContext;
    }

    setContext(context: string): void {
      if (context) {
        this.logger.setContext(context);
      }
    }

    handleError(error: Error, context: string): void {
      const type = error.name || 'Unknown error';
      this.logger.error(`${context}:${type}: ${error.message}`);
      throw error;
    }

    handleInfo(context: string): void {
      this.logger.log(context);
    }
  }
  return LoggableBase;
}

// Method decorator
export function LoggableError() {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      try {
        // apply method
        const result = originalMethod.apply(this, args);

        // handle asynchronous methods
        if (result && result instanceof Promise) {
          // Return promise
          return result.catch((error: any) => {
            this.handleError(error, key);
          });
        }

        // return actual result
        return result;
      } catch (error) {
        this.handleError(error, key);
      }
    };
    return descriptor;
  };
}

/**
 * TODO - log the args as well, but you'll need to sanitize first
 */
// Method decorator
export function LoggableInfo() {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      this.handleInfo(key);
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

// type Constructor = {
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   new (...args: any[]): {};
// };

// export function Loggable<T extends Constructor>(context?: string) {
//   return (Base: T) => {
//     class LoggableBase extends Base {
//       constructor(...args: any[]) {
//         super(...args);
//       }
//     }
//     return LoggableFactory<Constructor>(LoggableBase, context);
//   };
// }

// interface LoggableOptions {
//   abstract?: boolean;
//   context?: string;
// }

// export function Loggable<T extends Constructor | AbsConstructor>(
//   options?: LoggableOptions,
// ) {
//   return (Base: T) => {
//     if (options.abstract) {
//       return AbsLoggable<T>(options.context)(Base);
//     } else {
//       return RegLoggable<T>(options.context)(Base);
//     }
//   };
// }

// export function Loggable<T extends Constructor>(context?: string) {
//   return (Base: T) => {
//     class LoggableBase extends Base {
//       public logger: LoggableLogger;

//       constructor(...args: any[]) {
//         super(...args);
//         this.logger = new LoggableLogger(this.currentContext(context), {
//           timestamp: true,
//         });
//       }

//       currentContext(context?: string): string {
//         let currentContext = this.constructor.name;
//         if (context) {
//           currentContext += `:${context}`;
//         }
//         return currentContext;
//       }

//       setContext(context: string): void {
//         if (context) {
//           this.logger.setContext(context);
//         }
//       }

//       handleError(error: Error, subcontext: string): void {
//         const type = error.name || 'Unknown error';
//         this.logger.error(`${subcontext}:${type}: ${error.message}`);
//         // we still throw the error so it can bubble up the stack
//         throw error;
//       }

//       handleInfo(info: string, subcontext: string): void {
//         this.logger.log(`${subcontext}: ${info}`);
//       }
//     }
//     return LoggableBase;
//   };
// }
