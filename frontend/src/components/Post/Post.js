import React from "react";
import { Card, Avatar } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const { Meta } = Card;

export const Post = ({ username, avatarColour, preview }) => {
  return (
    <Card
      style={{ maxWidth: 900, margin: "0 auto" }}
      actions={[<EllipsisOutlined key='ellipsis' />]}
    >
      <Meta
        avatar={
          <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
        }
        description={preview}
      />
    </Card>
  );
};
