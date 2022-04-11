import { Request, Response } from 'express';
import * as ownerModel from './model'; 

export const createOwner = async (req: Request, res: Response) => {
    const { name, surname } = req.body;
    const owners = await ownerModel.createOwner(name, surname);
    res.json({name, surname, owners });
}

export const updateOwner = async (req: Request, res: Response) => {
    const { idOwner } = req.params;
    const { name, surname } = req.body;
    const owners = await ownerModel.updateOwnerById(parseInt(idOwner), name, surname);
    res.json({name, surname, owners });
}

export const getOwners = async (req: Request, res: Response) => {
    const owners = await ownerModel.getOwners();
    res.json({ owners });
}

export const getOwner = async (req: Request, res: Response) => {
    const { idOwner } = req.params;
    const owner = await ownerModel.getOwnerById(parseInt(idOwner));
    res.json({ owner });
}

export const deleteOwner = async (req: Request, res: Response) => {
    const { idOwner } = req.params;
    const owner = await ownerModel.deleteOwnerById(parseInt(idOwner));
    res.json({ owner });
}
