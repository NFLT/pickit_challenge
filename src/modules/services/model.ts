import * as database from '../../databases/db';

export const getServiceById = async (idService: number) => {
    const sql = "select * from servicios where id_servicio  = ?";
    let result = await database.execute(sql, [ idService ]);
    return result.pop();
}

export const getServices = async () => {
    const sql = "select * from servicios";
    let result = await database.execute(sql);
    return result;
}

export const createService = async (description: string, price: number) => {
    let sql = `
        insert into servicios (descripcion, importe)
        values (?, ?)
    `;

    let result = await database.execute(sql, [description,  price]);
    return result;
}


export const updateServiceById = async (idService: number, name: string, surname: string) => {
    let sql = `
        update servicios 
        set descripcion = ?, 
            importe = ?
        where id_servicio = ?
    `;

    let result = await database.execute(sql, [name,  surname, idService]);
    return result;
}

export const deleteServiceById = async (idService: number) => {
    let sql = `delete from servicios where id_servicio = ?`;
    let result = await database.execute(sql, [idService]);
    return result;
}