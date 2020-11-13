import React from "react";
import "./WritePost.css";
import { Alert, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  CLEAR_STORE,
  GET_CONTENT,
  GET_RESULT_REQUESTED,
  POST_IS_CREATED,
} from "../../redux/actions/writePostActions";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import Link from "@ckeditor/ckeditor5-link/src/link";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import LinkImage from "@ckeditor/ckeditor5-link/src/linkimage";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";

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
    SimpleUploadAdapter,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageResize,
    LinkImage,
    ImageUpload,
  ],
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "blockQuote",
    "codeBlock",
    "horizontalLine",
    "link",
    "|",
    "imageUpload",
    "imageStyle:full",
    "imageStyle:side",
    "imageTextAlternative",
  ],
  simpleUpload: {
    uploadUrl: `http://192.168.88.42:3000/${localStorage.getItem(
      "_id"
    )}/upload_image`,
  },
};

export const WritePost = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.writePostReducer.loading);
  const content = useSelector((store) => store.writePostReducer.content);
  const msg = useSelector((store) => store.writePostReducer.message);
  const err = useSelector((store) => store.writePostReducer.error);
  const isCreated = useSelector((store) => store.writePostReducer.isCreated);

  const createPostHandler = () => {
    dispatch({ type: POST_IS_CREATED });
    dispatch({ type: GET_RESULT_REQUESTED });
  };

  return (
    <>
      {msg ? (
        <Alert
          message={msg}
          type='success'
          showIcon
          closable
          style={{ maxWidth: "500px", margin: "0 auto" }}
          onClose={() => dispatch({ type: CLEAR_STORE })}
        />
      ) : null}
      {err ? (
        <Alert
          message={err}
          type='error'
          showIcon
          closable
          style={{ maxWidth: "500px", margin: "0 auto" }}
          onClose={() => dispatch({ type: CLEAR_STORE })}
        />
      ) : null}

      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={content}
        onReady={(editor) => {
          // console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log(data);
          //console.log({ event, editor, data });
          dispatch({ type: GET_CONTENT, payload: data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          // console.log("Focus.", editor);
        }}
      />
      <Button
        type='primary'
        size='large'
        style={{ marginTop: "15px", width: "30%" }}
        onClick={() => createPostHandler()}
        loading={isLoading}
        disabled={content.length < 20 || isCreated}
      >
        Create post
      </Button>
    </>
  );
};
