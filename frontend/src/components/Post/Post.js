import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Badge, Avatar } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import "./Post.css";

import { CommentCreator } from "../CommentCreator/CommentCreator";
import { CommentsList } from "../CommentsList/CommentsList";

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

import {
  GET_CURRENT_POST_ID,
  GET_POST_REQUSETED,
  SET_LIKE_REQUESTED,
  SET_DISLIKE_REQUESTED,
  GET_LIKES_REQUESTED,
} from "../../redux/actions/postsActions";

import { GET_COMMENTS_REQUESTED } from "../../redux/actions/commentsActions";

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

export const Post = () => {
  const { postId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_CURRENT_POST_ID, payload: postId });
    dispatch({ type: GET_POST_REQUSETED });
  }, [dispatch, postId]);

  const content = useSelector((store) => store.postsReducer.currentPost.body);
  const author = useSelector((store) => store.postsReducer.currentPost.author);
  const likes = useSelector((store) => store.postsReducer.likes);
  const likeResult = useSelector((store) => store.postsReducer.likeResult);

  const likesHandler = () => {
    const userId = localStorage.getItem("_id");
    const result = likes.filter((like) => like.author === userId);
    if (result.length === 0) {
      dispatch({ type: SET_LIKE_REQUESTED });
    } else {
      dispatch({ type: SET_DISLIKE_REQUESTED });
    }
  };

  useEffect(() => dispatch({ type: GET_LIKES_REQUESTED }), [
    dispatch,
    likeResult,
  ]);

  const commentResult = useSelector((store) => store.commentsReducer.result);
  const replyResult = useSelector((store) => store.commentsReducer.replyResult);
  useEffect(() => dispatch({ type: GET_COMMENTS_REQUESTED }), [
    dispatch,
    commentResult,
    replyResult,
  ]);
  const comments = useSelector((store) => store.commentsReducer.comments);

  return (
    <Card
      actions={[
        <Badge
          style={{ cursor: "default" }}
          size='small'
          overflowCount={999}
          count={likes.length}
        >
          <HeartOutlined
            style={{ cursor: "pointer", fontSize: 20 }}
            onClick={() => likesHandler()}
          />
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
            count={author && author.login}
          >
            <Avatar
              style={{
                backgroundColor: author && author.avatar,
                verticalAlign: "middle",
              }}
              size='large'
              gap={1}
            >
              {author && author.login.slice(0, 1).toUpperCase()}
            </Avatar>
          </Badge>
        }
        description={
          <div id='post_editor'>
            {content && (
              <CKEditor
                editor={ClassicEditor}
                config={editorConfiguration}
                data={content.text}
                disabled={true}
              />
            )}
            <CommentsList comments={comments} />
            <CommentCreator />
          </div>
        }
      />
    </Card>
  );
};
