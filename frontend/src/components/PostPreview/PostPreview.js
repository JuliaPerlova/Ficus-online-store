import React from "react";
import "./PostPreview.css";
import { Card, Avatar, Badge } from "antd";
import { EllipsisOutlined, HeartOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline";
import Link from "@ckeditor/ckeditor5-link/src/link";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import LinkImage from "@ckeditor/ckeditor5-link/src/linkimage";

const { Meta } = Card;

const editorConfiguration = {
  plugins: [
    Essentials,
    Bold,
    Italic,
    Paragraph,
    Heading,
    CodeBlock,
    HorizontalLine,
    Link,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageResize,
    LinkImage,
  ],
};

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
              zIndex: 1,
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
        description={
          <div id='post_preview_editor'>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              data={preview}
              disabled={true}
            />
          </div>
        }
      />
    </Card>
  );
};
