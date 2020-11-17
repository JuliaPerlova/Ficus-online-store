import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
  isReplyFormOpened,
  onClickReplyTo,
}) => {
  const dispatch = useDispatch();

  const isAuth = useSelector((store) => store.authReducer.isAuth);

  const replyHandler = () => {
    if (!isAuth) {
      return;
    } else {
      dispatch({ type: GET_CURRENT_COMMENT_ID, payload: commentId });
      onClickReplyTo();
    }
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
      {isReplyFormOpened ? <CommentCreator isReply={true} /> : null}
    </Comment>
  );
};
