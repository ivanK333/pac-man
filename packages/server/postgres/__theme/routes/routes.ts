import express from 'express';

import {
  getThemeByUserId,
  createThemeByUserId,
  updateThemeByUserId,
} from '../controllers/themeController';
import { auth } from '../../../middlewares/auth';

const router = express.Router();
router.use(auth);

router.get('/:user_id', getThemeByUserId); // get theme
router.post('/:user_id', createThemeByUserId); // create theme for user
router.patch('/:user_id', updateThemeByUserId); // update theme

export default router;
