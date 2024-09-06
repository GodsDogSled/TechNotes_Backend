import express from 'express';
import { Request, Response, Router } from 'express';
import noteController from '../controllers/noteController.js'

const noteRouter = express.Router()

noteRouter.route('/')
  .get(noteController.getAllNotes)
  .post(noteController.createNote)
  .patch(noteController.updateNote)
  .delete(noteController.deleteNote)

export default noteRouter