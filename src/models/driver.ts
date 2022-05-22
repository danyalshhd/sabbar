import mongoose from 'mongoose';
import { Location } from '../types/location';

// An interface that describes the properties
// that are requried to create a new Driver
interface DriverAttrs {
    name: string;
    numRides: number;
    rating: number;
    loc: Location;
}

// An interface that describes the properties
// that a Driver Model has
interface DriverModel extends mongoose.Model<DriverDoc> {
    build(attrs: DriverAttrs): DriverDoc;
}

// An interface that describes the properties
// that a Driver Document has
interface DriverDoc extends mongoose.Document {
    name: string;
    numRides: number;
    rating: number;
    loc: Location;
}

const driverSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        numRides: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number
        },
        loc: {
            type: { type: String },
            coordinates: [Number],
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

driverSchema.statics.build = (attrs: DriverAttrs) => {
    return new Driver(attrs);
};

const Driver = mongoose.model<DriverDoc, DriverModel>('Driver', driverSchema);

export { Driver };
