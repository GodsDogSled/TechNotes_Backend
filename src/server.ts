import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js';
import path from 'path'
import rootRouter from './routes/root.js';
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


// mongoose.set('strictQuery', false)
// logger.info('connecting to', config.MONGODB_URI)
// const MONGODB_URI = process.env.MONGODB_URI as string
app.use(express.json())
app.use(cookieParser());
connectDB()
// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     logger.info('connected to MongoDB')
//   })
//   .catch((error: unknown) => {
//     logger.error('error connecting to MongoDB:', error)
//   })

app.use(cors())
app.use(middleware.requestLogger)

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', rootRouter)

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




