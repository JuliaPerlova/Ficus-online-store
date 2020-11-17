import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "antd";

import { CommentComponent } from "../CommentComponent/CommentComponent";

import { CLEAR_REPLY_RESULT } from "../../redux/actions/commentsActions";

export const CommentsList = ({ comments }) => {
  const [replyIsOpen, setIsOpen] = useState("");

  const replyResult = useSelector((store) => store.commentsReducer.replyResult);

  const dispatch = useDispatch();

  if (replyResult) {
    dispatch({ type: CLEAR_REPLY_RESULT });
    setIsOpen("");
  }

  return (
    <List
      style={{ textAlign: "left" }}
      dataSource={comments}
      renderItem={(props) => {
        return (
          <CommentComponent
            author={props.comment.author}
            content={props.comment.text}
            time={props.comment.createdAt}
            commentId={props.comment._id}
            replys={props.replies}
            onClickReplyTo={() => setIsOpen(props.comment._id)}
            isReplyFormOpened={props.comment._id === replyIsOpen}
            key={props.comment._id}
          />
        );
      }}
      locale={{ emptyText: " " }}
    />
  );
};
