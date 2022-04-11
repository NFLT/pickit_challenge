import { Request, Response } from 'express';
import * as serviceModel from './model'; 

export const createService = async (req: Request, res: Response) => {
    const { description, price } = req.body;
    const services = await serviceModel.createService(description, price);
    res.json({description, price: parseFloat(price), services });
}

export const updateService = async (req: Request, res: Response) => {
    const { idService } = req.params;
    const { description, price } = req.body;
    const services = await serviceModel.updateServiceById(parseFloat(idService), description, price);
    res.json({description, price: parseFloat(price), services });
}

export const getServices = async (req: Request, res: Response) => {
    const services = await serviceModel.getServices();
    res.json({ services });
}

export const getService = async (req: Request, res: Response) => {
    const { idService } = req.params;
    const service = await serviceModel.getServiceById(parseInt(idService));
    res.json({ service });
}

export const deleteService = async (req: Request, res: Response) => {
    const { idService } = req.params;
    const service = await serviceModel.deleteServiceById(parseInt(idService));
    res.json({ service });
}
