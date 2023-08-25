import * as fs from 'fs'
import * as dotenv from "dotenv";

dotenv.config();

export function FileRotation(fileName: string, content: string): void {
    const filePath = "./src/logs/";
    if (fs.existsSync(filePath + fileName)) {
        if (getFileSizeInBytes(filePath + fileName) > parseInt(process.env.MAX_SIZE))
            fs.writeFileSync(filePath + fileName, content);
    }else {
        console.log("THere is no such a file");
    }
}

function getFileSizeInBytes(filePath: string): number {
    let stats = fs.statSync(filePath);
    var sizeInBytes = stats.size;
    
    return sizeInBytes;
}