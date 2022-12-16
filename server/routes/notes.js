import { Router } from "express";

import { getNote, getNotes, addNote, updateNote, deleteNote } from "../controllers/notes.js";

const router = Router();

router.get('/:id', getNote);
router.get('/', getNotes);
router.post('/', addNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;