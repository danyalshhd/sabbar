import mongoose from 'mongoose';
import { Location } from '../types/location';

// An interface that describes the properties
// that are requried to create a new Customer
interface CustomerAttrs {
    name: string;
    numRides: number;
    rating: number;
    loc: Location;
}

// An interface that describes the properties
// that a Customer Model has
interface CustomerModel extends mongoose.Model<CustomerDoc> {
    build(attrs: CustomerAttrs): CustomerDoc;
}

// An interface that describes the properties
// that a Customer Document has
interface CustomerDoc extends mongoose.Document {
    name: string;
    numRides: number;
    rating: number;
    loc: Location;
}

const customerSchema = new mongoose.Schema(
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
            coordinates: [Number]
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

customerSchema.statics.build = (attrs: CustomerAttrs) => {
    return new Customer(attrs);
};

const Customer = mongoose.model<CustomerDoc, CustomerModel>('Customer', customerSchema);

export { Customer };
