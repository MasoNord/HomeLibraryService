import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllHttpExceptionFiler implements ExceptionFilter {
  constructor(private readonly httAdapterHost: HttpAdapterHost) {}

  catch(execption: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httAdapterHost;
    const logger = new Logger("HTTP")
    const ctx = host.switchToHttp();

    const httpStatus =
      execption instanceof HttpException
        ? execption.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      method: httpAdapter.getRequestMethod(ctx.getRequest())
    };

    httpAdapter.reply(ctx.getResponse(), execption['response'], httpStatus);
    logger.error(`${responseBody.statusCode}  {${responseBody.path}, ${responseBody.method}} route`);
  }
}
