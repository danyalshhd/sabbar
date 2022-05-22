import { BadRequestError } from '@dstransaction/common';
import { calculateDistance } from './utils'

const nameIndex = 1;
const latIndex = 2;
const longIndex = 3;
const ridesIndex = 4;
const ratingIndex = 5;
const THRESHOLD_VICINITY_KMS = 100;

interface ICustomer {
    name: string,
    assignedDriver: string,
    failed: boolean,
}

interface IDriver {
    name: string,
    idle: boolean,
}

export class CustomerParser {
    customers: ICustomer[];
    drivers: IDriver[];

    constructor(customers: any, drivers: any) {
        this.drivers = [];
        this.customers = [];
        try {

            drivers.forEach((dv: any, driverIndex: number) => {
                if (!driverIndex) return;

                this.drivers.push({
                    name: dv[nameIndex],
                    idle: dv[ridesIndex] <= 1 && dv[ratingIndex] <= 1,
                });
            });

            customers.forEach((customer: any, index: number) => {
                if (!index) return;
                let max = Infinity;
                let nearestDriverName = '';
                const customerName = customer[nameIndex];
                let failed = true;
                drivers.forEach((driver: any, driverIndex: number) => {
                    if (!driverIndex) return;

                    const nearestDriverKms = calculateDistance(
                        { locationLatitude: customer[latIndex], locationLongitude: customer[longIndex] },
                        { locationLatitude: driver[latIndex], locationLongitude: driver[longIndex] },
                    );

                    if (nearestDriverKms < max && nearestDriverKms < THRESHOLD_VICINITY_KMS) {
                        max = nearestDriverKms;
                        nearestDriverName = driver[nameIndex];
                        failed = false;
                    }

                });

                this.customers.push({
                    name: customerName,
                    assignedDriver: nearestDriverName,
                    failed
                });
            });
        }
        catch (err: any) {
            throw new BadRequestError(err.message)
        }
    }

}