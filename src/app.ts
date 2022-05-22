import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import { errorHandler, NotFoundError } from '@dstransaction/common';
//import { CalculateDistance } from "./parser";
import { customRouter } from './routes/customer';
import cors from 'cors';
import xlsx from 'node-xlsx';
import { driverRouter } from './routes/driver';
import { Customer } from './models/customer';
import { Driver } from './models/driver';
import { CustomerParser } from './parser';
import { parseJsonSourceFileConfigFileContent } from 'typescript';

const app = express();
app.use(cors());
app.set('trust proxy', true);
app.use(json());
app.use(cookieParser());
app.use(
    cookieSession({
        signed: false,
        secure: true,
        name: 'session',
    })
);

app.use(customRouter);
app.use(driverRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

function parse() {
    const workSheetsFromFile = xlsx.parse(`${__dirname}/data/data.xlsx`);
    const parsed = new CustomerParser(workSheetsFromFile[1].data, workSheetsFromFile[0].data);
    return {
        customers: parsed.customers,
        drivers: parsed.drivers
    }
}

export { parse };
export { app };
