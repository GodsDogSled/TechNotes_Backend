import NoteModel from '../models/Note.js'
import { NoteDocument } from '../types/types.js';
import { Request, Response, Router } from 'express';

import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'


//@desc Get all notes
//@route GET /notes
//@access Private
export const getAllNotes = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const notes = await NoteModel.find().lean()
  if (!notes?.length) {
    res.status(400).json({ message: "No notes found" })
    return
  }

  res.json(notes)
})


//@desc Create new notes
//@route POST /notes
//@access Private
export const createNote = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const { user, title, text } = _req.body

  if (!user || !title || !text) {
    res.status(400).json({ message: "All fields are required" })
    return;
  }
  const noteObject = {
    user, title, text
  }
  const note = await NoteModel.create(noteObject)

  if (note) {
    res.status(201).json({ message: `Note ${title} created` })
  } else {
    res.status(400).json({ message: "Invalid note data recieved" })
  }

})

//@desc Update notes
//@route PATCH /notes
//@access Private
export const updateNote = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const { title, text, id, completed } = _req.body

  if (!id || !title || !text) {
    res.status(400).json({ message: "All fields are required" })
    return;
  }

  const updatedNote = {
    title,
    text,
    completed
  }

  const newNote = await NoteModel.findByIdAndUpdate(id, updatedNote).exec()
  if (!newNote) {
    res.status(400).json({ message: "Note not found" })
    return
  }
  console.log(updatedNote)
  res.json({ message: `Note updated` })
})

//@desc Delete notes
//@route DELETE /notes
//@access Private
export const deleteNote = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const { id } = _req.body

  if (!id) {
    res.status(400).json({ message: 'User ID Required' })
    return
  }

  const note = await NoteModel.findById(id) as NoteDocument | null

  if (!note) {
    res.status(400).json({ message: "Note not found" })
    return
  }

  await NoteModel.deleteOne({ _id: id })

  res.status(201).json({ message: `Note ${note.title} deleted from database ` })
})

export default { getAllNotes, createNote, updateNote, deleteNote }