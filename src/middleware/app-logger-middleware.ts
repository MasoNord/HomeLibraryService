import { Injectable, NestMiddleware, Logger, } from "@nestjs/common";
import {Response, Request, NextFunction} from "express";
import { HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware  {
    constructor(private readonly httAdapterHost: HttpAdapterHost) {}
    private logger = new Logger("HTTP");
    
    use(request: Request, response: Response, next: NextFunction): void {
        const {httpAdapter} = this.httAdapterHost;

        const responseBody = {
            path: httpAdapter.getRequestUrl(request),
            method: httpAdapter.getRequestMethod(request),
        }
        
        response.on('finish', () => {
            const { statusCode } = response;
      
            this.logger.log(
                `${statusCode} {${responseBody.path}, ${responseBody.method}} route`,
              );
          });
      
        next();
    }
}