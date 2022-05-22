import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {

  try {
    await mongoose.connect('mongodb://localhost:27017/sabbar');
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000.');
  });
};

start();
