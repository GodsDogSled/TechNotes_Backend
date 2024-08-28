import mongoose from "mongoose";
import config from '../config/config.js';
import logger from '../../middleware/logger.js';

const MONGODB_URI = process.env.MONGODB_URI as string

const connectDB = async () => {
  mongoose.set('strictQuery', false)
  logger.info('connecting to', config.MONGODB_URI)
  try {
    await mongoose.connect(MONGODB_URI)
      .then(() => {
        logger.info('connected to MongoDB')
      })
      .catch((error: unknown) => {
        logger.error('error connecting to MongoDB:', error)
      })
  } catch (error) {
    console.log(error)
  }
}

export default connectDB