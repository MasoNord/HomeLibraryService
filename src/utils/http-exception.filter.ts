import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  UnauthorizedException
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(HttpException, UnauthorizedException)
export class AllHttpExceptionFiler implements ExceptionFilter {
  constructor(private readonly httAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException | UnauthorizedException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httAdapterHost;
    const logger = new Logger(AllHttpExceptionFiler.name)
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    
    const httpStatus =
    exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      path: request.url,
      method: request.method
    };

    httpAdapter.reply(ctx.getResponse(), exception['response'], httpStatus);
    logger.error(`${JSON.stringify(responseBody)}`);
  }
}
