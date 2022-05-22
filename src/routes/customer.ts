import { NotFoundError, validateRequest } from '@dstransaction/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
const router = express.Router();
import { parse } from '../app';
import { Customer } from '../models/customer';

router.post('/customer', [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('You must supply a name'),
  body('lat')
    .trim()
    .notEmpty()
    .withMessage('You must supply a latitude'),
  body('long')
    .trim()
    .notEmpty()
    .withMessage('You must supply a longitude'),
  body('numRides')
    .trim()
    .notEmpty()
    .withMessage('You must supply numRides'),
  body('rating')
    .trim()
    .notEmpty()
    .withMessage('You must supply rating'),
],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, lat, long, numRides, rating } = req.body;

    const customer = Customer.build({
      name,
      loc: {
        type: 'Point',
        coordinates: [long, lat]
      },
      numRides,
      rating
    });
    await customer.save();

    res.status(201).send(customer);
  });

router.get('/customer',
  async (req: Request, res: Response) => {

    const failed = req.query.failed;

    let responseAddress = parse();
    let customers = failed ? responseAddress.customers.filter(ra => ra.failed) : responseAddress.customers;

    res.status(201).send(customers);

  });

router.delete('/customer/:customerId', async (req: Request, res: Response) => {
  const { customerId } = req.params;

  const account = await Customer.findByIdAndRemove(customerId);

  res.status(204).send(account);
});

router.put(
  '/customer/:id',
  [
    body('name').not().isEmpty().withMessage('name is required'),
    body('rating').not().isEmpty().withMessage('rating is required'),
    body('numRides').not().isEmpty().withMessage('numRides is required'),
    body('lat').not().isEmpty().withMessage('lat is required'),
    body('long').not().isEmpty().withMessage('long is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      throw new NotFoundError();
    }

    customer.set({
      name: req.body.name,
      loc: {
        type: 'Point',
        coordinates: [req.body.long, req.body.lat]
      },
      rating: req.body.rating,
      numRides: req.body.numRides,
    });
    await customer.save();

    res.send(customer);
  }
);

export { router as customRouter };
