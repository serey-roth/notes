import { Router } from "express";

import { getNote, getNotes, addNote, updateNote, deleteNote } from "../controllers/notes.js";
import auth from '../middleware/auth.js'

const router = Router();

router.get('/:id', auth, getNote);
router.get('/', auth, getNotes);
router.post('/', auth, addNote);
router.patch('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote);

export default router;