import { Request, Response } from 'express';
import * as ownerModel from './model'; 

export const createCar = async (req: Request, res: Response) => {
    const { brand, model, year, colour, carPlate, idOwner } = req.body;
    const cars = await ownerModel.createCar(brand, model, year, colour, carPlate, idOwner);
    res.json({brand, model, year, colour, carPlate, idOwner, cars });
}

export const updateCar = async (req: Request, res: Response) => {
    const { idCar } = req.params;
    const { brand, model, year, colour, carPlate, idOwner } = req.body;
    const cars = await ownerModel.updateCarById(parseInt(idCar), brand, model,
        year, colour, carPlate, idOwner);
    res.json({ brand, model, year, colour, carPlate, idOwner, cars });
}

export const getCars = async (req: Request, res: Response) => {
    const cars = await ownerModel.getCars();
    res.json({ cars });
}

export const getCar = async (req: Request, res: Response) => {
    const { idCar } = req.params;
    const cars = await ownerModel.getCarById(parseInt(idCar));
    res.json({ cars });
}

export const deleteCar = async (req: Request, res: Response) => {
    const { idCar } = req.params;
    const cars = await ownerModel.deleteCarById(parseInt(idCar));
    res.json({ cars });
}
