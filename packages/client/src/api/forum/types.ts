export type TCreateTopic = {
  title: string;
  description: string;
};

export type TLeaveMessage = {
  message: string;
  topicId: string;
};

export type TLeaveComment = {
  message: string;
  messageId: string;
};

export type TMessageUser = {
  name: string;
  id: string;
  avatar: string;
};

export type TComment = {
  user: TMessageUser;
  comment: string;
  createdAt: string;
  likes: string[];
  emojis: string[];
  id: string;
};

export type TMessage = {
  message: string;
  user: TMessageUser;
  id: string;
  comments: TComment[];
  likes: string[];
  emojis: string[];
  createdAt: string;
};

export type TTopic = {
  topicName: string;
  messages: TMessage[];
  id: string;
};

export type TTopicHeader = {
  topicName: string;
  count: number;
  id: string;
};