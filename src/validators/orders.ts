import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { ErrorCodes, NotFoundError, ValidationError, ConstraintError } from '../errors/database.errors';

import validateResult from '../middlewares/validationResults';

import * as orderModel from '../modules/orders/model';
import * as carModel from '../modules/cars/model';
import * as serviceModel from '../modules/services/model';

/**
 * Valida si existe la orden especificada y si es posible cargarle un nuevo servicio
 * @param idOrder
 * @returns verdadero si existe y esta abierta
 */
const validateOrder = async (idOrder: number) => {
    const order = await orderModel.getOrders(idOrder);
    let msg: string;
    if (!order) {
        msg = "No existe la orden especificada";
        throw new NotFoundError(ErrorCodes.NOT_FOUND_ORDER, msg);
    } else if (order.rela_estado != 1) {
        msg = "No se puede agregar el servicio a la orden porque no está abierta";
        throw new ConstraintError(ErrorCodes.CONSTRINT_NOT_OPEN_ORDER, msg)
    }

    return true;
};


/**
 * Valida si existe la orden especificada
 * @param idOrder
 * @returns verdadero si existe
 */
 const existOrder = async (idOrder: number) => {
    const order = await orderModel.getOrders(idOrder);

    if (!order) {
        let msg = "No existe la ordern especificada";
        throw new NotFoundError(ErrorCodes.NOT_FOUND_ORDER, msg);
    }

    return true;
};


/**
 * Valida si existe el auto especificado
 * @param idCar
 * @returns Boleano indicando si se trata de un campo inválido
 */
 const existCar = (idCar: number) => {
    const car = carModel.getCars(idCar);

    if (!car) {
        let msg = "El auto especificado no se encuentra registrado en el sistema";
        throw new NotFoundError(ErrorCodes.NOT_FOUND_CAR, msg);
    }

    return true;
};


/**
 * Valida si existe el servicio especificado
 * @param idService
 * @returns Boleano indicando si se trata de un campo inválido
 */
 const existsService = async (idService: number) => {
    const service = await serviceModel.getServiceById(idService);
    console.log(service);
    if (!service) {
        let msg = "Servicio inexistente";
        throw new NotFoundError(ErrorCodes.NOT_FOUND_SERVICE, msg);
    }

    return true;
};

/**
 * Valida si el auto especificado se encuentra o no en una orden abierta
 * @param idCar 
 * @returns true en caso de que no se encuentre registrado, en caso contrario lanza un error
 */
const notHasOpenOrders = async (idCar: number) => {
    const openOrders = await orderModel.getOpenOrdersByCar(idCar);
    console.log(openOrders.length);    
    if (openOrders.length != 0) {
        const msg = "Ya existe una orden abierta para este automóvil.";
        throw new ConstraintError(ErrorCodes.CONSTRAINT_CAR_ALREADY_IN_ORDER, msg);
    } 

    return true;
}


const hasDetails = async (idOrder: number) => {
    const orderDetails = await orderModel.getOrderDetails(idOrder);
    
    if (orderDetails.length == 0) {
        const msg = "Debe agregar al menos un servicio a la orden para poder confirmarla.";
        throw new ConstraintError(ErrorCodes.CONSTRAINT_CAR_ALREADY_IN_ORDER, msg);
    }
    return true;
}


export const validateConfirmation = async (idOrder: number) => {
    const order = await orderModel.getOrders(idOrder);

    if (![ Status.CONFIRMED, Status.OPEN ].includes(order.rela_estado)) {
        const msg = "Sólo se pueden confirmar ordenes abiertas";
        throw new ConstraintError(ErrorCodes.CONSTRAINT_STATE_CHANGE, msg);
    }

    return true;
}


export const validateCancelation = async (idOrder: number) => {
    const order = await orderModel.getOrders(idOrder);

    if (![ Status.CONFIRMED, Status.OPEN ].includes(order.rela_estado)) {
        const msg = "Solo se pueden cancelar ordenes abiertas o confirmadas";
        throw new ConstraintError(ErrorCodes.CONSTRAINT_STATE_CHANGE, msg);
    }

    return true;
}

export const validateClose = async (idOrder: number) => {
    const order = await orderModel.getOrders(idOrder);

    if (order.rela_estado != Status.CONFIRMED) {
        const msg = "Sólo se pueden cerrar ordenes confirmadas";
        throw new ConstraintError(ErrorCodes.CONSTRAINT_STATE_CHANGE, msg);
    }

    return true;
}

enum Status {
    OPEN = 1,
    CONFIRMED = 2, 
    CLOSED = 3,
    CANCELLED = 4
}


export const validateCreateOrder = [
    check('idCar')
        .exists()
        .not()
        .isEmpty()
        .custom(existCar)
        .custom(notHasOpenOrders),
    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
];


export const validateAddService = [
    check('idOrder')
        .exists()
        .not()
        .isEmpty()
        .custom(validateOrder),
    
    check('idService')
        .exists()
        .not()
        .isEmpty()
        .custom(existsService),

    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
];

export const validateRemoveService = [
    check('idOrder')
        .exists()
        .not()
        .isEmpty()
        .custom(validateOrder),
    
    check('idService')
        .exists()
        .not()
        .isEmpty()
        .custom(existsService),

    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
];

export const validateConfirmOrder = [
    check('idOrder')
        .exists()
        .not()
        .isEmpty()
        .custom(existOrder)
        .custom(validateConfirmation)
        .custom(hasDetails),

    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
];

export const validateCloseOrder = [
    check('idOrder')
        .exists()
        .not()
        .isEmpty()
        .custom(existOrder)
        .custom(validateClose),

    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
];

export const validateCancelOrder = [
    check('idOrder')
        .exists()
        .not()
        .isEmpty()
        .custom(existOrder)
        .custom(validateCancelation),

    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
];