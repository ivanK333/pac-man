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
import {
  getTopicReactions,
  postTopicReaction,
  deleteTopicReaction,
} from '../controllers/topicReactionController';
import {
  getMessageReactions,
  postMessageReaction,
  deleteMessageReaction,
} from '../controllers/messageReactionController';
import {
  getCommentReactions,
  postCommentReaction,
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
router.get('/topic/:topic_id/reactions', getTopicReactions); // get all topic reactions
router.get('/message/:message_id/reactions', getMessageReactions); // get all message reactions
router.get('/comment/:comment_id/reactions', getCommentReactions); // get all comment reactions

router.post('/topics', topicValidation, postTopic); // post topic
router.post('/messages/:topic_id', messageValidation, postMessage); // post message
router.post('/comments/:message_id', commentValidation, postComment); // post comment
router.post('/topic/:topic_id/reactions', postTopicReaction); // post topic reaction
router.post('/message/:message_id/reactions', postMessageReaction); // post message reaction
router.post('/comment/:comment_id/reactions', postCommentReaction); // post comment reaction

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

export default router;
