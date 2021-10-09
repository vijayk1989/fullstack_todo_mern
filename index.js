import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import todosRouter from './routes/todos.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const PORT = process.env.PORT || 5000;

const mongoDB_uri = `MONGO_DB_URI=mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.thb2s.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

app.use('/api', todosRouter);
app.use(express.static(path.join(__dirname, 'client', 'dist')));

mongoose
  .connect(mongoDB_uri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Conntected to DB. App running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
