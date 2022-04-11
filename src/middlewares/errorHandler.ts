import { Request, Response, NextFunction } from 'express';
import { PickitChallengeError, DatabaseError, ConstraintError } from '../errors/database.errors';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof PickitChallengeError) {
        const pickitError = error as PickitChallengeError;
        console.log(pickitError);
        res.status(500).json({
            errCode: pickitError.errCode, 
            message: pickitError.message
        });
    } else {
        next(error);
    }
}

export default errorHandler;