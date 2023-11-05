export type TCreateTopic = {
  title: string;
  text: string;
};

export type TLeaveMessage = {
  text: string;
  topicId: string;
};

export type TLeaveComment = {
  text: string;
  messageId: string;
};

export type TMessageUser = {
  login: string;
  id: string;
  avatar: string;
};

export type TComment = {
  id: string;
  text: string;
  ownerId: string;
  user: TMessageUser;
  messageId: string;
  updatedAt: string;
  createdAt: string;
};

export type TMessage = {
  createdAt: string;
  id: string;
  ownerId: string;
  user: TMessageUser;
  text: string;
  updatedAt: string;
  commentsCount?: string;
};

export type TTopic = {
  id: string;
  title: string;
  text: string;
  ownerId: string;
  user: TMessageUser;
  createdAt: string;
  updatedAt: string;
  messagesCount: string;
};

export interface TTopicWithMEssages extends Omit<TTopic, 'messagesCount'> {
  messages: TMessage[];
}
