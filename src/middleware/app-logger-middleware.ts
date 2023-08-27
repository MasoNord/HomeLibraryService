import { Injectable, NestMiddleware, Logger, } from "@nestjs/common";
import {Response, Request, NextFunction} from "express";
import * as fs from 'fs'
import { HttpAdapterHost } from '@nestjs/core';
import { FileRotation } from "src/utils/file-rotation";

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware  {
    constructor(private readonly httAdapterHost: HttpAdapterHost) {}
    private logger = new Logger("HTTP");
    private filename: string = "";
    private logfileDirectory = "./src/logs";
    
    use(request: Request, response: Response, next: NextFunction): void {
        const {httpAdapter} = this.httAdapterHost;
        const responseBody = {
            path: httpAdapter.getRequestUrl(request),
            method: httpAdapter.getRequestMethod(request),
            statusCode: response.status,
            timestamp: new Date()
        }

        try {
            if (!fs.existsSync(this.logfileDirectory)) {
                fs.mkdirSync(this.logfileDirectory);
            }
        }catch(err) { console.log(err); }

        response.on('finish', () => {
            const {statusCode} = response;
            const contentForFile = `${JSON.stringify(responseBody.timestamp)} ${JSON.stringify(request.url)} ${JSON.stringify(request.params)} ${JSON.stringify(request.method)} ${statusCode} \n`;

            if(statusCode >= 400 && statusCode < 500) {
                this.filename = "error.txt";                 
            }
            else if(statusCode >= 200 && statusCode < 400){
                this.filename = "log.txt";
            }
            else {
                this.filename = "warn.txt";
            }
            
            fs.appendFileSync(
                `${this.logfileDirectory}/${this.filename}`,
                contentForFile
            );

            FileRotation(this.filename, contentForFile);
        });
      
        next();
    }
}