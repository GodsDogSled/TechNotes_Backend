import mongoose from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose as any);

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true
  }
)

interface NoteDocument extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  text: string;
  completed: boolean;
  ticket: number;
  createdAt: Date;
  updatedAt: Date;
}



noteSchema.plugin(AutoIncrement as any, {
  inc_field: 'ticket',
  id: 'ticketNums',
  start_seq: 500
})

// const NoteModel = mongoose.model('Note', noteSchema)
const NoteModel = mongoose.model<NoteDocument>('Note', noteSchema);

export default NoteModel