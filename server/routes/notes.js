import { Router } from "express";

import { getNotes, addNote, updateNote, deleteNote } from "../controllers/notes.js";
import checkAuthenticated from "../middleware/checkAuthenticated.js";

const router = Router();

router.get('/', checkAuthenticated, getNotes);
router.post('/', checkAuthenticated, addNote);
router.patch('/:id', checkAuthenticated, updateNote);
router.delete('/:id', checkAuthenticated, deleteNote);

export default router;