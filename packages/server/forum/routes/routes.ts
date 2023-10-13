import express from 'express';

import {
  getTopics,
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

const router = express.Router();
router.use(auth);

router.get('/topics', getTopics); // get all topics
router.get('/messages/:topic_id', getMessages); // get topic messages
router.get('/comments/:message_id', getComments); // get message comments

router.post('/topics', postTopic); // post topic
router.post('/messages/:topic_id', postMessage); // post message
router.post('/comments/:message_id', postComment); // post comment

router.delete('/topics/:id', deleteTopic); // delete topic
router.delete('/messages/:id', deleteMessage); // delete message
router.delete('/comments/:id', deleteComment); // delete comment

router.patch('/topics/:id', updateTopic); // update topic
router.patch('/messages/:id', updateMessage); // update message
router.patch('/comments/:id', updateComment); // update comment

export default router;
