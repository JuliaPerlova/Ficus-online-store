import React from "react";
import { List } from "antd";

import { CommentComponent } from "../CommentComponent/CommentComponent";

export const CommentsList = ({ comments }) => {
  return (
    <List
      style={{ textAlign: "left" }}
      dataSource={comments}
      renderItem={(props) => (
        <CommentComponent
          author={props.comment.author}
          content={props.comment.text}
          time={props.comment.createdAt}
          commentId={props.comment._id}
          replys={props.replies}
          key={props.comment._id}
        />
      )}
      locale={{ emptyText: " " }}
    />
  );
};
