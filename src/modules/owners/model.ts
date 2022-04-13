import * as database from '../../databases/db';


export const getOwnerById = async (idOwner: number) => {
    const sql = "select * from propietario where id_propietario  = ?";
    let result = await database.execute(sql, [ idOwner ]);
    return result.pop();
}

export const getOwners = async () => {
    const sql = "select * from propietario";
    let result = await database.execute(sql);
    return result;
}

export const createOwner = async (name: string, surname: string) => {
    let sql = `
        insert into propietario (nombre, apellido)
        values (?, ?)
    `;

    let result = await database.execute(sql, [name,  surname]);
    return result.insertId;
}


export const updateOwnerById = async (idOwner: number, name: string, surname: string) => {
    let sql = `
        update propietario 
        set nombre = ?, 
            apellido = ?
        where id_propietario = ?
    `;

    let result = await database.execute(sql, [name,  surname, idOwner]);
    return result.affectedRows;
}

export const deleteOwnerById = async (idOwner: number) => {
    let sql = `delete from propietario where id_propietario = ?`;
    let result = await database.execute(sql, [idOwner]);
    return result;
}

export const getCars = async (idOwner: number) => {
    const sql = `select * from autos where rela_propietario = ?`;
    let result = await database.execute(sql, [idOwner]);

    console.log(idOwner);
    console.log(result);
    return result;    
}