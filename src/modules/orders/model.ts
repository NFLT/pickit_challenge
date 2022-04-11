import * as database from '../../databases/db';

/**
 * Obtiene todas las ordenes abiertas en la que el vehículo se encuentra registrado.
 * @param idCar Id del vehículo
 * @returns Array con instancias de las ordenes
 */
export const getOpenOrdersByCar = async (idCar: number) => {
    let sql = `select * from ordenes where rela_auto = ? and rela_estado = 1`;
    const result = await database.execute(sql, [ idCar ]);
    return result;
}

/**
 *  Recupera de base de datos una lista con todas las ordenes registradas.
 * En caso de espacificar un id, recupera solo la instancia de la orden con el id especificado
 * @param idOrder (opcional) id de la orden a consultar 
 * @returns Array de ordenes | Instancia de orden especificada por el id
 */
export const getOrders = async (idOrder?: number) => {
    let sql = `
        select 
            id_orden, 
            fecha orden_fecha, 
            total orden_total,
            marca auto_marca,
            modelo auto_modelo,
            anio auto_anio,
            color auto_color,
            patente auto_patente,
            apellido propietario_apellido,
            nombre propietario_nombre,
            descripcion estado_descripcion
        from ordenes
            inner join autos on rela_auto = id_auto
            inner join propietario on rela_propietario = id_propietario
            inner join estados_ordenes on rela_estado = id_estado
    `;

    let result: any;
    if (idOrder) {
        sql = sql + ` where id_orden = ?`;
        result = await database.execute(sql, [ idOrder ]);

        return result.pop();
    } else {
        return await database.execute(sql);
    }
}

/**
 * Crea una orden en base de datos
 * @param idCar id del automóvil a registrar en la orden
 * @returns id del registro insertado
 */
export const createOrder = async (idCar: number) => {
    let sql = `
        insert into ordenes (rela_auto)
        values (?)
    `;
    
    let result = await database.execute(sql, [ idCar ]);

    return result.insertId;
}

/**
 * Agrega un servicio a una orden especificada
 * @param idOrder id de la orden
 * @param idService id del servicio
 */
export const addService = async (idOrder: number, idService: number) => {
    const sql = `insert into detalle_ordenes (rela_orden, rela_servicio) values (?, ?)`;
    const result = await database.execute(sql, [ idOrder, idService ]);
}


/**
 * Quita un servicio de la orden especificada
 * @param idOrder id de la orden
 * @param idService id del servicio
 */
export const removeService = async (idOrder: number, idService: number) => {
    const sql = `delete from detalle_ordenes where rela_orden = ? and rela_servicio = ?`;
    const result = await database.execute(sql, [idOrder, idService]);
}


/**
 * Recupera un lista de los servicios registrados en la orden
 * @param idOrder id de la orden
 * @returns Array de ordenes
 */
export const getOrderDetails = async (idOrder: number) => {
    const sql = `
        select 
            id_servicio,
            servicios.descripcion servicio_descripcion,
            detalle_ordenes.importe detalle_importe
        from detalle_ordenes
        inner join servicios on rela_servicio = id_servicio 
        where rela_orden = ?
    `;
    const result = await database.execute(sql, [ idOrder ]);
    return result; 
}


export const hasService = async (idOrder: number, idService: number) => {
    const sql = `
        select count(*) cant from detalle_ordenes 
        where rela_orden = ? and rela_servicio = ?
    `;
    const result = await database.execute(sql, [idOrder, idService]);
    return result.cant > 0
}

/**
 * Cambia el estado de la orden especificada
 * @param idOrder id de orden
 * @param idStatus id de estado
 */
export const changeState = async (idOrder: number, idStatus: number) => {
    const sql = `update ordenes set rela_estado = ? where id_orden = ?`;
    const result = await database.execute(sql, [ idStatus, idOrder ]);
}