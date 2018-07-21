import {Request, Response, NextFunction} from "express";

class ErrorHandlerController {

    errorHandler(err:Error, req:Request, res:Response, next:NextFunction) {
        if (res.headersSent) {
            return next(err);
        }
        else{
            res.status(500).json({message:"Something went wrong..."})
        }
    }
}

const errorHandlerController = new ErrorHandlerController();
export default errorHandlerController;