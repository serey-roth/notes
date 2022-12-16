import mongoose from "mongoose";

export const noteSchema = mongoose.Schema({
    title: String,
    date: String,
    description: String,
})

const Note = mongoose.model('Note', noteSchema);

export default Note;