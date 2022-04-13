import { NextFunction, Request, Response } from 'express';
import * as ownerModel from './model';
import ownerMapper from './mappers';
import { ConstraintError, ErrorCodes, NotFoundError } from '../../errors/database.errors';


export const createOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, surname } = req.body;
        const idOwner = await ownerModel.createOwner(name, surname);
        res.status(201).json({ idOwner, msg: "La operación se completo satisfactoriamente!" });
    } catch (error) {
        next(error);
    }
}

export const updateOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idOwner } = req.params;
        const { name, surname } = req.body;

        const owner = await ownerModel.getOwnerById(parseInt(idOwner));
        if (!owner) {
            let msg = "No se encontró el recurso solicitado";
            throw new NotFoundError(ErrorCodes.NOT_FOUND_OWNER, msg);
        }

        await ownerModel.updateOwnerById(parseInt(idOwner), name, surname);
        res.status(204).json();    
    } catch (error) {
        next(error);
    }    
}

export const getOwners = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const owners = await ownerModel.getOwners();
        const ownerDtos = owners.map((owner: any) => ownerMapper.toOwnerDto(owner));
        res.json({ owners: ownerDtos });
    } catch (error) {
        next(error);
    }
}

export const getOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idOwner } = req.params;
        const owner = await ownerModel.getOwnerById(parseInt(idOwner));
        if (!owner) {
            let msg = "No se encontró el recurso solicitado";
            throw new NotFoundError(ErrorCodes.NOT_FOUND_OWNER, msg);
        }

        const ownerDto = ownerMapper.toOwnerDto(owner);
        res.json({ owner: ownerDto });   
    } catch (error) {
        next(error);
    }
}

export const deleteOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {    
        const idOwner = parseInt(req.params.idOwner);

        if ((await ownerModel.getCars(idOwner)).length != 0 ) {
            let msg = "No se puede borrar el registro del propietario, dado que tiene vehiculos asociados!";
            throw new ConstraintError(ErrorCodes.CONSTRAINT_HAS_LINKED_DATA, msg);
        }

        ownerModel.deleteOwnerById(idOwner);
        res.status(204).json();    
    } catch (error) {
        next(error);
    }    
}

export const getCars = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idOwner = parseInt(req.params.idOwner);

        const owner = await ownerModel.getOwnerById(idOwner);
        if (!owner) {
            let msg = "No se encontró el recurso solicitado";
            throw new NotFoundError(ErrorCodes.NOT_FOUND_OWNER, msg);
        }

        const cars = await ownerModel.getCars(idOwner);
        const ownerCarDtos = cars.map((car: any) => ownerMapper.toCarDto(car));
        res.json({ cars: ownerCarDtos });
    } catch (error) {
        next(error);
    }
}
