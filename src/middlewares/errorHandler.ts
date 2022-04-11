import { Request, Response, NextFunction } from 'express';
import { PickitChallengeError, DatabaseError, ConstraintError, NotFoundError } from '../errors/database.errors';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof PickitChallengeError) {
        if (error instanceof NotFoundError) {
            const notFoundError = error as NotFoundError;
            console.log(notFoundError);
            res.status(404).json({
                errCode: notFoundError.errCode, 
                message: notFoundError.message
            });
        } else if (error instanceof DatabaseError) {
            console.log(error);
            const message = 'Ha ocurrido un error al intentar realizar la operación';
            res.status(500).json({ errCode: 500, message });
        } else if (error instanceof ConstraintError) {
            const constraintError = error as ConstraintError;
            console.log(constraintError);
            res.status(400).json({
                errCode: constraintError.errCode, 
                message: constraintError.message
            });
        }
    } else {
        next(error);
    }
}

export default errorHandler;