import * as database from '../../databases/db';

export const getCars = async (idCar?: number) => {
    let sql = `
        select 
            id_propietario,
            propietario.nombre propietario_nombre,
            propietario.apellido propietario_apellido,
            id_auto,
            autos.marca auto_marca,
            autos.modelo auto_modelo,
            autos.anio auto_anio,
            autos.color auto_color,
            autos.patente auto_patente
        from autos
        inner join propietario on rela_propietario = id_propietario
    `;

    if (idCar) {
        sql += ` where id_auto = ?`;
        let result = await database.execute(sql, [ idCar ]);
        return result.pop();
    } else {
        return await database.execute(sql);
    }
}

export const getCarByPlate = async (carPlate: string) => {
    const sql = `select * from autos where patente = ?`;
    const result = await database.execute(sql, [ carPlate ]);
    return result.pop();
}

export const getCarHistory = async (idCar: number) => {
    const sql = `
        select 
            ordenes.id_orden,
            ordenes.fecha orden_fecha,
            ordenes.total orden_total,
            estados_ordenes.descripcion orden_estado,
            servicios.descripcion detalle_servicio,
            detalle_ordenes.importe detalle_importe
        from ordenes 
            inner join detalle_ordenes on rela_orden = id_orden
            inner join servicios on rela_servicio = id_servicio
            inner join estados_ordenes on rela_estado = id_estado
        where rela_auto = ? 
    `;

    const result = await database.execute(sql, [ idCar ]);
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