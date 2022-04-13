import { NextFunction, Request, Response } from 'express';
import * as carModel from './model'; 

import carMapper from './mappers';
import { ConstraintError, ErrorCodes } from '../../errors/database.errors';

export const createCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { brand, model, year, colour, carPlate, idOwner } = req.body;
        const idCar = await carModel.createCar(brand, model, year, colour, carPlate, idOwner);
        res.status(201).json({ idCar });
    } catch (error) {
        next(error)
    }
}

export const updateCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idCar } = req.params;
        const { brand, model, year, colour, carPlate, idOwner } = req.body;

        const car = await carModel.getCarByPlate(carPlate.toUpperCase()); 

        if (car != null && car.id_auto != idCar) {
            let msg = "El vehículo que esta intentando ingresar ya se encuentra registrado.";
            throw new ConstraintError(ErrorCodes.CONSTRAINT_DUPLICATED_CAR_PLATE, msg);
        }

        await carModel.updateCarById(parseInt(idCar), brand, model, year, colour, carPlate, idOwner);
        res.status(204).json({  });
    } catch (error) {
        next(error);
    }
}

export const getCars = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cars = await carModel.getCars();
        const carDtos = cars.map((car: any) => carMapper.toCarDto(car));
        res.json({ cars: carDtos });
    } catch (error) {
        next(error);
    }
}

export const getCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idCar } = req.params;
        const car = await carModel.getCars(parseInt(idCar));
        
        const carDto = carMapper.toCarDto(car);
        res.json({ car: carDto });
    } catch (error) {
        next(error);
    }
}

export const deleteCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idCar = parseInt(req.params.idCar);

        // EL auto se elimina solamente si no se le realizó ningun servicio
        const serviceHistory = await carModel.getCarHistory(idCar);
        if (serviceHistory.length != 0) {
            const msg = "No se puede eliminar el vehículo especificado, ya que tiene servicios asociados.";
            throw new ConstraintError(ErrorCodes.CONSTRAINT_HAS_LINKED_DATA, msg);
        }

        await carModel.deleteCarById(idCar);
        res.status(204).json();   
    } catch (error) {
        next(error);
    }
}
