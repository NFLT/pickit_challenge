import dotenv from 'dotenv';
import path from 'path';
import { getRouterPaths } from "../routes";

dotenv.config();

const swaggerConfig = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PickIt Challenge',
            version: '1.0.0'
        },
        servers: [
            {
                url: process.env.API_SERVER_BASE_URL
            }
        ]
    },
    apis: getRouterPaths(path.join(__dirname, '../modules/'))
}

export default swaggerConfig;