import { Router } from "express";
import { signIn, signUp } from "../../controllers/auth/local.js";

const router = new Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);

export default router;