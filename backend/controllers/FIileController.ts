import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/CustomError";


const parseLogFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let logFile: any;
        // let uploadPath: string;
        const parsedLogs: any = [];
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new CustomError(StatusCodes.BAD_REQUEST, "No files were uploaded.");
        }
        logFile = req.files.file;
        const data = logFile.data.toString().split("\n");
        data.forEach((log: string) => {
            const parsedLog = log.split(" - ");
            const transactionDetails = JSON.parse(parsedLog[2]);
            const res = {
                timestamp: new Date(parsedLog[0]).getTime(),
                loglevel: parsedLog[1],
                transactionId: transactionDetails.transactionId,
                err: transactionDetails.err ? transactionDetails.err : ""
            }
            parsedLogs.push(res);
        });
        res.status(StatusCodes.OK).json(parsedLogs);
        // uploadPath = __dirname.substring(0, __dirname.lastIndexOf('\\')) + `/uploads/${logFile.name}`;
        // logFile.mv(uploadPath, (error: any) => {
        //     if (error) {
        //         console.log(error);
        //         return;
        //     }
        //     res.status(StatusCodes.OK).json({ message: "File uploaded." });
        // })
        // const file = createReadStream(uploadPath);
        // file.on('data', (data) => {
        //     const logs = data.toString().split("\n");
        //     logs.forEach(log => {
        //         console.log(`${num}: ${log}`);
        //         num++;
        //     })
        // })
    } catch (error) {
        next(error);
    }
}

export default parseLogFile;