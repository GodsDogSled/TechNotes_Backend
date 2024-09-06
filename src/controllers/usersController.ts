import UserModel from '../models/User.js'
import { UserType, UserDocument } from '../types/types.js';
import { Request, Response, Router } from 'express';
import NoteModel from '../models/Note.js'
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'




//@desc Get all users
//@route GET /users
//@access Private
export const getAllUsers = asyncHandler(async (_req: Request, res: Response): Promise<any> => {
  const users = await UserModel.find().select('-password').lean()
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" })
  }
  res.json(users)
})

//@desc Create new users
//@route POST /users
//@access Private
export const createNewUser = asyncHandler(async (_req, res): Promise<void> => {
  const { username, password, roles } = _req.body

  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    res.status(400).json({ message: "All fields are required" })
    return;
  }

  //Check for dupes
  const duplicate = await UserModel.findOne({ username }).lean().exec()
  if (duplicate) {
    res.status(409).json({ message: "Duplicate Username" })
    return;
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  const userObject = { username, "password": hashedPassword, roles }

  const user = await UserModel.create(userObject)
  if (user) {
    res.status(201).json({ message: `New user ${username} created` })
  } else {
    res.status(400).json({ message: 'Invalid User Data recieved' })
  }
})

//@desc Update user
//@route PATCH /users
//@access Private
export const updateUser = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const { id, username, roles, active } = _req.body

  if (!username || !Array.isArray(roles) || !roles.length || !id || typeof active !== 'boolean') {
    res.status(400).json({ message: "All fields are required" })
    return
  }


  const updatedUser = {
    username: username,
    roles: roles,
    active: active
  }



  const duplicate = await UserModel.findOne({ username }).lean().exec()

  if (duplicate && duplicate?._id !== id) {
    res.status(400).json({ message: "That username is already in use" })
    return
  }

  const oldUserInfo = await UserModel.findById(id).lean()
  if (!oldUserInfo) {
    res.status(400).json({ message: "User not found" })
    return
  }

  const user = await UserModel.findByIdAndUpdate(id, updatedUser).exec();
  if (!user) {
    res.status(400).json({ message: "User not found" })
    return
  }

  res.json({ message: `User ${oldUserInfo.username} updated` })
})


//@desc Delete user
//@route DELETE /users
//@access Private
export const deleteUser = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const { id } = _req.body
  if (!id) {
    res.status(400).json({ message: 'User ID Required' })
    return
  }

  const notes = await NoteModel.findOne({ user: id }).lean().exec()
  if (notes) {
    res.status(400).json({ message: "User has assigned notes" })
    return
  }

  const user = await UserModel.findById(id).exec() as UserDocument | null
  if (!user) {
    res.status(400).json({ message: "User not found" })
    return
  }

  const result = await UserModel.deleteOne({ _id: id })

  res.json({ message: `Username ${user.username} with ID ${id} deleted` })

})


export default { getAllUsers, createNewUser, updateUser, deleteUser };
