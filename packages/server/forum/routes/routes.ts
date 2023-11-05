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
import {
  // getTopicReactions,
  // postTopicReaction,
  deleteTopicReaction,
} from '../controllers/topicReactionController';
import {
  // getMessageReactions,
  // postMessageReaction,
  deleteMessageReaction,
} from '../controllers/messageReactionController';
import {
  // getCommentReactions,
  // postCommentReaction,
  deleteCommentReaction,
} from '../controllers/commentReactionController';
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

router.post('/topics', postTopic); // post topic
router.post('/messages/:topic_id', postMessage); // post message
router.post('/comments/:message_id', postComment); // post comment
router.post('/theme/:user_id', createThemeByUserId); // create theme for user

router.delete('/topics/:id', deleteTopic); // delete topic
router.delete('/messages/:id', deleteMessage); // delete message
router.delete('/comments/:id', deleteComment); // delete comment
router.delete('/topic/:topic_id/reactions/:reaction_id', deleteTopicReaction); // delete topic reaction
router.delete(
  '/message/:message_id/reactions/:reaction_id',
  deleteMessageReaction,
); // delete message reaction
router.delete(
  '/comment/:comment_id/reactions/:reaction_id',
  deleteCommentReaction,
); // delete comment reaction
router.patch('/topics/:id', topicValidation, updateTopic); // update topic
router.patch('/messages/:id', messageValidation, updateMessage); // update message
router.patch('/comments/:id', commentValidation, updateComment); // update comment
router.patch('/theme/:user_id', updateThemeByUserId); // update theme

export default router;
