import express, {Request, Response} from 'express'
import http from 'http';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { getAllRouters } from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const routers = getAllRouters();
for (let i = 0; i < routers.length; i++) {
    let router = routers[i]
    if (router) {
        app.use(router);    
    }
}

const server = http.createServer(app);
server.listen(3000, () => {
    console.log("Working on port 3000");
});