import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Comment, Avatar } from "antd";
import moment from "moment";

import { GET_CURRENT_COMMENT_ID } from "../../redux/actions/commentsActions";

import { CommentCreator } from "../../components/CommentCreator/CommentCreator";

export const CommentComponent = ({
  author,
  content,
  time,
  commentId,
  replys,
}) => {
  const dispatch = useDispatch();

  const [showReply, setShowReply] = useState(false);

  const replyHandler = () => {
    dispatch({ type: GET_CURRENT_COMMENT_ID, payload: commentId });
    setShowReply((state) => !state);
  };

  return (
    <Comment
      author={author.login}
      avatar={
        <Avatar
          style={{
            backgroundColor: author.avatar,
            verticalAlign: "middle",
          }}
          size='large'
          gap={1}
        >
          {author.login.slice(0, 1).toUpperCase()}
        </Avatar>
      }
      content={content}
      datetime={moment(time).fromNow()}
      actions={[
        <span key='comment-basic-reply-to' onClick={() => replyHandler()}>
          Reply to
        </span>,
      ]}
    >
      {replys
        ? replys.map((reply) => {
            return (
              <Comment
                author={reply.author.login}
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: reply.author.avatar,
                      verticalAlign: "middle",
                    }}
                    size='large'
                    gap={1}
                  >
                    {reply.author.login.slice(0, 1).toUpperCase()}
                  </Avatar>
                }
                content={reply.text}
                datetime={moment(reply.createdAt).fromNow()}
                key={reply._id}
              />
            );
          })
        : null}
      {showReply ? <CommentCreator isReply={true} /> : null}
    </Comment>
  );
};
