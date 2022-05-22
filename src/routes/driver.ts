import express, { Request, Response } from 'express';
import { parse } from '../app';
const router = express.Router();
import { Driver } from '../models/driver';

router.get('/driver',
    async (req: Request, res: Response) => {
        const idle = req.query.idle;
        const responseAddress = parse();
        let drivers = idle ? responseAddress.drivers.filter(ra => ra.idle) : responseAddress.drivers;

        res.status(200).send(drivers);
    });

export { router as driverRouter };