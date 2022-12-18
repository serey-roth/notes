import { Router } from "express";

import requireEmailAuth from "../../middleware/requireEmailAuth.js";
import { logout, signIn, signUp } from "../../controllers/auth/email.js";

const router = new Router();

router.post('/signIn', requireEmailAuth, signIn);
router.post('/signUp', signUp);
router.post('/logOut', logout);

export default router;