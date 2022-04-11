import { NextFunction, Request, Response } from 'express';
import * as orderModel from './model'; 
import orderMapper from './mappers';
import { ConstraintError, NotFoundError, ErrorCodes } from '../../errors/database.errors';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idCar } = req.body;
        
        // Si el vehiculo se encuentra en una orden con estado abierto, no se permite su registro
        const openOrders = await orderModel.getOpenOrdersByCar(idCar);
        console.log(openOrders.length);    
        if (openOrders.length != 0) {
            const msg = "Ya existe una orden abierta para este automóvil.";
            throw new ConstraintError(ErrorCodes.CONSTRAINT_CAR_ALREADY_IN_ORDER, msg);
        } 

        const idOrder = await orderModel.createOrder(parseInt(idCar));
        res.status(201).json({ idOrder });
    } catch(error){
        next(error);
    }
    
}


export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderModel.getOrders();
        const orderDtos = orders.map((order: any)=> {
            return orderMapper.toOrderDto(order);
        });
        res.json({ orders: orderDtos });
    } catch(error) {
        next(error);
    }
}


export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idOrder = parseInt(req.params.idOrder);
        const order = await orderModel.getOrders(idOrder);
        const orderDetails = await orderModel.getOrderDetails(idOrder);

        const orderDto = orderMapper.toOrderDto(order, orderDetails);

        res.json({ order: orderDto });
    } catch(error) {
        next(error);
    }
}


export const addService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idOrder = parseInt(req.params.idOrder);
        const idService = parseInt(req.params.idService);

        const order = orderModel.getOrders(idOrder);
        if (!order) {
            const msg = "Orden inexistente!";
            throw new NotFoundError(ErrorCodes.CONSTRAINT_INCOMPATIBLE_COLOR_SERVICE, msg);
        }
        
        //Se restringe la posibilidad de aplicar el servicio de pintura a autos grises
        const orderDto = orderMapper.toOrderDto(order);
        if (orderDto.carColor.toUpperCase() == "GRIS" && idService == 6) {
            const msg = "No se puede realizar el servicio de pintura a un auto gris";
            throw new ConstraintError(ErrorCodes.CONSTRAINT_INCOMPATIBLE_COLOR_SERVICE, msg);
        }

        //Verificando si la orden dada ya tiene registrdo el servicio especificado
        const hasService = await orderModel.hasService(idOrder, idService);
        if (hasService) {
            const msg = "El servicio que se está intentando cargar, ya se encuentra registrado en la orden";
            throw new ConstraintError(ErrorCodes.CONSTRAINT_DUPLICATED_ORDER_SERVICE, msg);
        }

        await orderModel.addService(idOrder, idService); 
        res.status(204).json();
    } catch (error) {
        next(error);
    }   
}


export const removeService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idOrder = parseInt(req.params.idOrder);
        const idService = parseInt(req.params.idService);

        await orderModel.removeService(idOrder, idService); 
        res.status(204).json();
    } catch(error) {
        next(error);
    }   
}


export const confirmOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idOrder  = parseInt(req.params.idOrder);
        const order = await orderModel.getOrders(idOrder);

        if (order.rela_estado == Status.OPEN) {
            orderModel.changeState(idOrder, Status.CONFIRMED); 
            res.status(204).json();
        } else {
            const msg = "Sólo se pueden confirmar ordenes abiertas";
            throw new ConstraintError(ErrorCodes.CONSTRAINT_STATE_CHANGE, msg);
        }
    } catch (error) {
        next(error);
    }
    
}


export const closeOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idOrder = parseInt(req.params.idOrder);
        const order = await orderModel.getOrders(idOrder);

        if (order.rela_estado = Status.CONFIRMED) {
            await orderModel.changeState(idOrder, Status.CLOSED); 
            res.status(204).json();
        } else {
            const msg = "Solo se pueden Cerrar ordenes Confirmadas";
            throw new ConstraintError(ErrorCodes.CONSTRAINT_STATE_CHANGE, msg);
        }
    } catch(error) {
        next(error);
    }  
}


export const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idOrder  = parseInt(req.params.idOrder);
        const order = await orderModel.getOrders(idOrder);

        if ([ Status.CONFIRMED, Status.OPEN ].includes(order.rela_estado)) {
            await orderModel.changeState(idOrder, Status.CANCELLED); 
            res.status(204).json();
        } else {
            const msg = "Solo se pueden Cerrar ordenes Abiertas o confirmadas";
            throw new ConstraintError(ErrorCodes.CONSTRAINT_STATE_CHANGE, msg);
        }
    } catch(error) {
        next(error);
    }
}


enum Status {
    OPEN = 1,
    CONFIRMED = 2, 
    CLOSED = 3,
    CANCELLED = 4
}