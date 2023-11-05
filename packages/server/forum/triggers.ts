export const registerCommentsCountQuery = `
CREATE OR REPLACE FUNCTION update_comments_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP='INSERT' THEN
    UPDATE messages
    SET comments_count = (
        SELECT COUNT(*) FROM comments WHERE message_id = NEW.message_id
    )
    WHERE id = NEW.message_id;
    END IF;
    IF TG_OP='DELETE' THEN
    UPDATE messages
    SET comments_count = (
        SELECT COUNT(*) FROM comments WHERE message_id = OLD.message_id
    )
    WHERE id = OLD.message_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_comments_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_comments_count();
`;

export const registerMessagesCountQuery = `
CREATE OR REPLACE FUNCTION update_messages_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP='INSERT' THEN
	  UPDATE topics
	  SET messages_count = (
	    SELECT COUNT(*) FROM messages WHERE topic_id = NEW.topic_id
	  )
	  WHERE id = NEW.topic_id;
    END IF;
    IF TG_OP='DELETE' THEN
	  UPDATE topics
	  SET messages_count = (
	    SELECT COUNT(*) FROM messages WHERE topic_id = OLD.topic_id
	  )
	  WHERE id = OLD.topic_id;
    END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_messages_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON messages
FOR EACH ROW
EXECUTE FUNCTION update_messages_count();
`;
