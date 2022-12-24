import { Router } from "express";
import passport from "passport";

import { getNotes, getNote, addNote, updateNote, deleteNote } from "../controllers/notes.js";

const router = Router();

const jwtMiddleware = (req, res, next) => {
    passport.authenticate('jwt-auth', { session: false })(req, res, next);
}

router.get('/', jwtMiddleware, getNotes);
router.get('/:id', jwtMiddleware, getNote);
router.post('/', jwtMiddleware, addNote);
router.patch('/:id', jwtMiddleware, updateNote);
router.delete('/:id', jwtMiddleware, deleteNote);

export default router;