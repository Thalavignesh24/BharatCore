import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SUCCESS_MESSAGE_KEY } from '../common/success-message.decorator';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const customMessage = this.reflector.get<string>(
      SUCCESS_MESSAGE_KEY,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: customMessage || 'Request successful',
        data,
      })),
    );
  }
}
