import { Router } from "express";

import { getNotes, addNote, updateNote, deleteNote } from "../controllers/notes.js";
import requireJWTAuth from '../middleware/requireJWTAuth.js'

const router = Router();

router.get('/', requireJWTAuth, getNotes);
router.post('/', requireJWTAuth, addNote);
router.patch('/:id', requireJWTAuth, updateNote);
router.delete('/:id', requireJWTAuth, deleteNote);

export default router;