import mongoose, { Schema, Model, Document, Types } from 'mongoose';

interface BaseUser {
  _id: Types.ObjectId;
  username: string;
  roles: Array<string>;
  active: boolean;
  password: string;
}

interface BaseNote {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  title: string;
  text: string;
  completed: boolean;
  createdAt: NativeDate;
  updatedAt: NativeDate;
}

export interface NoteDocument extends Document {
  user: Types.ObjectId;
  text: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export type UserDocument = mongoose.Document & BaseUser


export type UserType = BaseUser
