import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { DatabaseError, ErrorCodes } from '../errors/database.errors';


dotenv.config();

const config = {
    user: process.env.API_DB_USER,
    password: process.env.API_DB_PASSWORD,
    host: process.env.API_DB_HOST,
    database: process.env.API_DB_DATABASE
};

let connection : any = null;
let isTransaction: boolean = false;

const open = async () => {
    await close();
    connection = await mysql.createConnection(config);
};

const close = async () => {
    if (connection != null) {
        await connection.end();
    }
}

export const execute = async (sql:string, args:any[] | null = null) => {
    try {
        /*if (!isTransaction)*/ await open();
        let [rows, fields] = await connection.query(sql, args);
        /*if (!isTransaction)*/ await close();
        
        return rows;
    } catch (error: any) {
        throw new DatabaseError(ErrorCodes.DATABASE_ERROR, error.message);
    }
}

export const beginTransaction = async () => {
    const sql = "START TRANSACTION";
    isTransaction = true;
    await open();
    await execute(sql);
}

export const rollback = async () => {
    const sql = "ROLLBACK";
    await execute(sql);
    await close();
    isTransaction = false;
}

export const commit = async () => {
    const sql = "COMMIT";
    await execute(sql);
    await close();
    isTransaction = false;
}
