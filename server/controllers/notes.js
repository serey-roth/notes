import Note from "../models/note.js"
import mongoose from "mongoose"

export const getNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No note with this id');
    }

    try {
        const note = await Note.findById(id);
        res.status(200).json(note);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(404).send('error.message');
    }
}

export const addNote = async (req, res) => {
    const newNote = new Note(req.body);

    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(409).send(error.message);
    }
}

export const updateNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No note with this id');
    }

    try {
        const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No note with this id');
    }

    try {
        await Note.findByIdAndDelete(id);
        res.status(200).json({ id, success: true });
    } catch (error) {
        res.status(404).send(error.message);
        console.log('buy')
    }
}