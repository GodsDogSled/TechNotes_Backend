import mongoose, { Schema, Model, Document, Types } from 'mongoose';

interface BaseUser {
  _id: Types.ObjectId;
  username: string;
  roles: Array<string>;
  active: boolean;
  password: string;
}


export type UserDocument = mongoose.Document & BaseUser

export type UserType = BaseUser
