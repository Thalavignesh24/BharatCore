// src/common/response.interceptor.ts

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { SUCCESS_MESSAGE_KEY, SUCCESS_STATUS_CODE_KEY } from './success-message.decorator';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const message = this.reflector.get<string>(
      SUCCESS_MESSAGE_KEY,
      context.getHandler(),
    );
    const statusCode = this.reflector.get<number>(
      SUCCESS_STATUS_CODE_KEY,
      context.getHandler(),
    ) ?? 200;

    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        response.status(statusCode);
        return {
          success: true,
          statusCode,
          message,
          data,
        };
      }),
    );
  }
}
