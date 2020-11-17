import React, { useState } from "react";
import { List } from "antd";

import { CommentComponent } from "../CommentComponent/CommentComponent";

export const CommentsList = ({ comments }) => {
  const [replyIsOpen, setIsOpen] = useState("");

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
