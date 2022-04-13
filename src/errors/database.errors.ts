/**
 * Clase generica para los errores tipicos relacionados con el proyecto
 */
export class PickitChallengeError extends Error {
    errCode: number;
    description: string;

    constructor(errCode: number, description: string) {
        super(description);
        this.errCode = errCode;
        this.description = description;
    }
}

/**
 * Errores producidos por las consultas y conexiones a la base de datos
 */
export class DatabaseError extends PickitChallengeError {
    constructor(errCode: number, description: string) {
        super(errCode, description);
    }
}

/**
 * Errores de validacion
 */
 export class ValidationError extends PickitChallengeError {
    constructor(errCode: number, description: string) {
        super(errCode, description);
    }
}

/**
 * Errores producidos por alguna restricción de las reglas de negocio
 */
export class ConstraintError extends PickitChallengeError {
    constructor(errCode: number, description: string) {
        super(errCode, description);
    }
}

export class NotFoundError extends PickitChallengeError {
    constructor(errCode: number, description: string) {
        super(errCode, description);
    }
}

export enum ErrorCodes {
    DATABASE_ERROR = 1000,    
    NOT_FOUND_OWNER = 2001,
    NOT_FOUND_CAR = 2002,
    NOT_FOUND_SERVICE = 2003,
    NOT_FOUND_ORDER = 2004,
    VALIDATION_NAME_SURNAME = 3001,
    VALIDATION_CAR_PLATE = 3002,
    VALIDATION_NEGATIVE_VALUE = 3003,
    CONSTRAINT_INCOMPATIBLE_COLOR_SERVICE = 4001,
    CONSTRAINT_DUPLICATED_ORDER_SERVICE = 4002,
    CONSTRAINT_DUPLICATED_CAR_PLATE = 4003,
    CONSTRAINT_CAR_ALREADY_IN_ORDER = 4004,
    CONSTRAINT_STATE_CHANGE = 4005,
    CONSTRAINT_HAS_LINKED_DATA = 4006,
    CONSTRINT_NOT_OPEN_ORDER = 4007
}
