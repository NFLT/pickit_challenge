import { NextFunction, Request, Response } from 'express';
import * as carModel from './model'; 

import carMapper from './mappers';
import { ConstraintError, ErrorCodes } from '../../errors/database.errors';

export const createCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { brand, model, year, colour, carPlate, idOwner } = req.body;

        //Se verifica que si ya está registrado un auto con la patente especificada.
        if (carModel.getCarByPlate(carPlate) != null) {
            const msg = "El vehículo que esta intentando igresar ya se encuentra registrado.";
            throw new ConstraintError(ErrorCodes.CONSTRAINT_DUPLICATED_CAR_PLATE, msg);
        }

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

        //Se verifica que si ya está registrado un auto con la patente especificada.
        const car = await carModel.getCarByPlate(carPlate);
        if (car != null && car.id_auto != idCar) {
            const msg = "Ya existe otro vehículo con la patente especificada.";
            throw new ConstraintError(ErrorCodes.CONSTRAINT_DUPLICATED_CAR_PLATE, msg);
        }

        await carModel.updateCarById(parseInt(idCar), brand, model, year, colour, carPlate, idOwner);
        res.json({  });
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

        const cars = await carModel.deleteCarById(idCar);
        res.json({ cars });   
    } catch (error) {
        next(error);
    }
}
