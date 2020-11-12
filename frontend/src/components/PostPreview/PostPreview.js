import React from "react";
import { Card, Avatar, Badge } from "antd";
import { EllipsisOutlined, HeartOutlined } from "@ant-design/icons";
import ReactHtmlParser from "react-html-parser";
import { useHistory } from "react-router-dom";

const { Meta } = Card;

export const PostPreview = ({
  username,
  avatarColour,
  preview,
  postId,
  likes,
}) => {
  const history = useHistory();
  return (
    <Card
      style={{ maxWidth: 1100, margin: "0 auto", marginTop: 15 }}
      actions={[
        <EllipsisOutlined
          style={{ fontSize: 20 }}
          key='ellipsis'
          onClick={() => history.push(`/post/${postId}`)}
        />,
        <Badge
          style={{ cursor: "default" }}
          size='small'
          overflowCount={999}
          count={likes}
        >
          <HeartOutlined style={{ cursor: "default", fontSize: 20 }} />
        </Badge>,
      ]}
    >
      <Meta
        avatar={
          <Badge
            style={{
              cursor: "default",
              backgroundColor: "#fff",
              color: "#999",
              boxShadow: "0 0 0 1px #d9d9d9 inset",
            }}
            size='small'
            count={username}
          >
            <Avatar
              style={{ backgroundColor: avatarColour, verticalAlign: "middle" }}
              size='large'
              gap={1}
            >
              {username.slice(0, 1).toUpperCase()}
            </Avatar>
          </Badge>
        }
        description={ReactHtmlParser(preview)}
      />
    </Card>
  );
};
