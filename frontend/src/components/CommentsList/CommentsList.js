import React from "react";
import { List } from "antd";

import { CommentComponent } from "../CommentComponent/CommentComponent";

export const CommentsList = ({ comments }) => {
  console.log(comments);
  return (
    <List
      style={{ textAlign: "left" }}
      dataSource={comments}
      renderItem={(props) => (
        <CommentComponent
          author={props.author}
          content={props.text}
          time={props.createdAt}
          commentId={props._id}
        />
      )}
      locale={{ emptyText: " " }}
    />
  );
};
