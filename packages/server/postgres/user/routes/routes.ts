import express from 'express';

import { updateThemeByUserId } from '../controllers/userController';
import { auth } from '../../../middlewares/auth';

const router = express.Router();
router.use(auth);

router.patch('/:user_id', updateThemeByUserId); // update user

export default router;
