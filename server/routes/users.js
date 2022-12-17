import { Router } from "express";
import { signIn, signUp } from "../controllers/users.js";

const router = new Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);

export default router;