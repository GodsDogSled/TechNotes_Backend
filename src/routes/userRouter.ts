import express from 'express';
import { Request, Response, Router } from 'express';
import userController from '../controllers/usersController.js'

const userRouter = express.Router()

// userRouter.get('/', async (_req: Request, res: Response) => {

// })

// userRouter.post('/', async (_req: Request, res: Response) => {

// })

// userRouter.patch('/', async (_req: Request, res: Response) => {

// })

// userRouter.delete('/', async (_req: Request, res: Response) => {

// })

userRouter.route('/')
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

export default userRouter