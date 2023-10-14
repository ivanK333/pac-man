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
  name: string;
  id: string;
  avatar: string;
};

export type TComment = {
  id: string;
  text: string;
  ownerAvatar: string;
  ownerId: string;
  ownerLogin: string;
  messageId: string;
  updatedAt: string;
  createdAt: string;
};

export type TMessage = {
  createdAt: string;
  id: string;
  ownerAvatar: string;
  ownerId: string;
  ownerLogin: string;
  text: string;
  updatedAt: string;
  commentsCount: string;
};

export type TTopic = {
  id: string;
  title: string;
  text: string;
  ownerId: string;
  ownerLogin: string;
  ownerAvatar: string;
  createdAt: string;
  updatedAt: string;
  messagesCount: string;
};

export interface TTopicWithMEssages extends Omit<TTopic, 'messagesCount'> {
  messages: TMessage[];
}
