import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): unknown;
}

export function SerializeInterceptor(dto: ClassConstructor) {
  return UseInterceptors(new SerializeResponseInterceptor(dto));
}

export class SerializeResponseInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        const serialized = plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
        return serialized;
      }),
    );
  }
}
