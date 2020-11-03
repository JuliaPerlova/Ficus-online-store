import React from "react";
import { Card, Avatar } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import ReactHtmlParser from "react-html-parser";
import { useHistory } from "react-router-dom";

const { Meta } = Card;

export const PostPreview = ({ username, avatarColour, preview, postId }) => {
  const history = useHistory();
  return (
    <Card
      style={{ maxWidth: 1100, margin: "0 auto", marginTop: 15 }}
      actions={[
        <EllipsisOutlined
          key='ellipsis'
          onClick={() => history.push(`/post/${postId}`)}
        />,
      ]}
    >
      <Meta
        avatar={
          <Avatar
            style={{ backgroundColor: avatarColour, verticalAlign: "middle" }}
            size='large'
            gap={1}
          >
            {username.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        description={ReactHtmlParser(preview)}
      />
    </Card>
  );
};
