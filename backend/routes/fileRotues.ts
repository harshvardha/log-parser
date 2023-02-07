import { Router } from "express";
import parseLogFile from "../controllers/FIileController";

const fileRouter: Router = Router();

fileRouter.post("/", parseLogFile);

export default fileRouter;