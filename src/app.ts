import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

import { getAllRouters } from './routes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const routers = getAllRouters();
for (let i = 0; i < routers.length; i++) {
    let router = routers[i]
    if (router) {
        app.use(router);    
    }
}

app.use(errorHandler);

process.on('UnhandledPromiseRejectionWarning', (error) => {
    console.log('Ha ocurrido un error');
});

const port = process.env.API_SERVER_PORT; 
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Working on port ${ port }`);
});