import { NextFunction, Request, Response } from 'express';
import * as serviceModel from './model'; 
import serviceMapper from './mappers'; 
import { ErrorCodes, NotFoundError } from '../../errors/database.errors';

export const createService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { description, price } = req.body;
        const idServices = await serviceModel.createService(description, price);
        res.status(201).json({ idServices });
    } catch (error) {
        next(error);
    }
}

export const updateService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idService } = req.params;
        const { description, price } = req.body;
        await serviceModel.updateServiceById(parseFloat(idService), description, price);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}

export const getServices = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const services = await serviceModel.getServices();
        const serviceDtos = services.map((service: any) => serviceMapper.toServiceDto(service));
        res.json({ services: serviceDtos });    
    } catch (error) {
        next(error);
    }
}

export const getService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idService } = req.params;
        const service = await serviceModel.getServiceById(parseInt(idService));

        if (service == null) {
            const msg = "¡No se ha encontrado el servicio!";
            throw new NotFoundError(ErrorCodes.NOT_FOUND_SERVICE, msg);
        }

        const serviceDto = serviceMapper.toServiceDto(service);
        res.json({ service: serviceDto });    
    } catch (error) {
        next(error);
    }   
}