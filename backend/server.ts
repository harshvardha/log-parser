import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
const helmet = require("helmet");
import CustomError from "./types/CustomError";
import fileRouter from "./routes/fileRotues";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(morgan("common"));
app.use(cors({
    origin: "*"
}));
app.use(fileUpload());

app.use("/upload", fileRouter);

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode: number = error.status || 500;
    const message: string = error.message || "Server error. We are fixing it.";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(PORT, () => {
    console.log("server started at port 5000");
});