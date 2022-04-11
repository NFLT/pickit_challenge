import * as database from '../../databases/db';

export const getCarById = async (idOwner: number) => {
    const sql = "select * from autos where id_auto  = ?";
    let result = await database.execute(sql, [ idOwner ]);
    return result.pop();
}

export const getCars = async () => {
    const sql = "select * from autos";
    let result = await database.execute(sql);
    return result;
}

export const createCar = async (brand: string, model: string, year: number, colour:string , 
    carPlate: string, idOwner: number) => {
    const sql = `
        insert into autos (marca, modelo, anio, color, patente, rela_propietario)
        values (?, ?, ?, ?, ?, ?)
    `;
    
    const args = [brand, model, year, colour, carPlate, idOwner] 
    let result = await database.execute(sql, args);
    return result;
}


export const updateCarById = async (idCar: number, brand: string, model: string, 
    year: number, colour:string, carPlate: string, idOwner: number) => {
    let sql = `
        update autos 
        set marca = ?, 
            modelo = ?,
            anio = ?,
            color= ?,
            patente = ?,
            rela_propietario = ?
        where id_auto = ?
    `;
    
    const args = [ brand, model, year, colour, carPlate, idOwner, idCar];
    let result = await database.execute(sql, args);
    return result;
}

export const deleteCarById = async (idCar: number) => {
    let sql = `delete from autos where id_auto = ?`;
    let result = await database.execute(sql, [idCar]);
    return result;
}