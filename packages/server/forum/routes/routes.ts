import express from 'express';

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
  createThemeByUserId,
  getThemeByUserId,
  updateThemeByUserId,
} from '../controllers/themeController';

const router = express.Router();
router.use(auth);

router.get('/topics', getTopics); // get all topics
router.get('/topics/:id', getTopicWithMessages); // get all topics
router.get('/messages/:topic_id', getMessages); // get topic messages
router.get('/comments/:message_id', getComments); // get message comments
router.get('/theme/:user_id', getThemeByUserId); // get theme

router.post('/topics', postTopic); // post topic
router.post('/messages/:topic_id', postMessage); // post message
router.post('/comments/:message_id', postComment); // post comment
router.post('/theme/:user_id', createThemeByUserId); // create theme for user

router.delete('/topics/:id', deleteTopic); // delete topic
router.delete('/messages/:id', deleteMessage); // delete message
router.delete('/comments/:id', deleteComment); // delete comment

router.patch('/topics/:id', updateTopic); // update topic
router.patch('/messages/:id', updateMessage); // update message
router.patch('/comments/:id', updateComment); // update comment
router.patch('/theme/:user_id', updateThemeByUserId); // update theme

export default router;
