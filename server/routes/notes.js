import { Router } from "express";
import passport from "passport";

import { getNotes, addNote, updateNote, deleteNote } from "../controllers/notes.js";

const router = Router();

const jwtMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false })(req, res, next);
}

router.get('/', jwtMiddleware, getNotes);
router.post('/', jwtMiddleware, addNote);
router.patch('/:id', jwtMiddleware, updateNote);
router.delete('/:id', jwtMiddleware, deleteNote);

export default router;