import express from 'express';

import {
  getThemeByUserId,
  createThemeByUserId,
  updateThemeByUserId,
} from '../controllers/themeController';
import {
  getTopics,
  getTopicWithMessages,
  deleteTopic,
  postTopic,
  updateTopic,
} from '../controllers/topicController';
import {
  getMessages,
  updateMessage,
  deleteMessage,
  postMessage,
} from '../controllers/messageController';
import {
  getComments,
  updateComment,
  deleteComment,
  postComment,
} from '../controllers/commentController';
import { auth } from '../../middlewares/auth';
import {
  commentValidation,
  messageValidation,
  topicValidation,
} from './validation';

const router = express.Router();
router.use(auth);

router.get('/topics', getTopics); // get all topics
router.get('/topics/:id', getTopicWithMessages); // get all topics
router.get('/messages/:topic_id', getMessages); // get topic messages
router.get('/comments/:message_id', getComments); // get message comments
router.get('/theme/:user_id', getThemeByUserId); // get theme

router.post('/theme/:user_id', createThemeByUserId); // create theme for user
router.post('/topics', topicValidation, postTopic); // post topic
router.post('/messages/:topic_id', messageValidation, postMessage); // post message
router.post('/comments/:message_id', commentValidation, postComment); // post comment

router.delete('/topics/:id', deleteTopic); // delete topic
router.delete('/messages/:id', deleteMessage); // delete message
router.delete('/comments/:id', deleteComment); // delete comment

router.patch('/theme/:user_id', updateThemeByUserId); // update theme
router.patch('/topics/:id', topicValidation, updateTopic); // update topic
router.patch('/messages/:id', messageValidation, updateMessage); // update message
router.patch('/comments/:id', commentValidation, updateComment); // update comment

export default router;
