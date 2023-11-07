import express from 'express';

import { updateThemeByUserId, getUser } from '../controllers/userController';
import { auth } from '../../../middlewares/auth';

const router = express.Router();
router.use(auth);

router.patch('/:user_id/theme', updateThemeByUserId);
router.get('/:user_id', getUser);

export default router;
