import mongoose from "mongoose"

import User from "../models/user.js";
import Note from "../models/note.js"

export const getNotes = async (req, res) => {
    if (!req.userId) {
        return res.status(400).json('User is not authenticated!');
    }

    try {
        const user = await User.findOne({ _id: req.userId });
        res.status(200).json(user.notes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addNote = async (req, res) => {
    if (!req.userId) {
        return res.status(400).json('User is not authenticated!');
    }

    const newNote = new Note(req.body);

    try {
        const user = await User.findOne({ _id: req.userId });
        user.notes.push(newNote);
        await user.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(409).send(error.message);
    }
}

export const updateNote = async (req, res) => {
    if (!req.userId) {
        return res.status(400).json('User is not authenticated!');
    }

    const { id: noteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No note with this id');
    }

    try {
        const user = await User.findOne(
            { _id: req.userId, 'notes._id': noteId },
            { $set: { 'notes.$': req.body }},
            { new: true }
        )
        
        const updatedNote = user.notes.find(note => note._id == noteId);
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

export const deleteNote = async (req, res) => {
    if (!req.userId) {
        return res.status(400).json('User is not authenticated!');
    }

    const { id: noteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No note with this id');
    }

    try {
        const user = await User.findOne({ _id: req.userId });
        user.notes.pull(noteId);
        await user.save();
        res.status(200).json({ id, success: true });
    } catch (error) {
        res.status(404).send(error.message);
    }
}