import logger from './logger.js';

import { Request, Response } from 'express';

const requestLogger = (_req: Request, response: Response, next: any) => {
  logger.info('Method:', _req.method)
  logger.info('Path:  ', _req.path)
  logger.info('Body:  ', _req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}



const errorHandler = (error: any, request: Request, response: Response, next: any) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}