import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js';
import path from 'path'
import rootRouter from './routes/root.js';
import userRouter from './routes/userRouter.js';
import cookieParser from "cookie-parser"
import logger from '../middleware/logger.js';
import middleware from '../middleware/middleware.js';
import cors from 'cors';
import connectDB from './config/dbConn.js';

const app = express();
const PORT = process.env.PORT || 3500
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json())
app.use(cookieParser());

connectDB()

app.use(cors())
app.use(middleware.requestLogger)

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', rootRouter)
app.use('/user', userRouter)

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 not found' })
  } else {
    res.type('txt').send('404 not found')
  }
})

mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`SERVER running on ${PORT}`))
})

mongoose.connection.on('error', err => {
  console.log(err)
})




