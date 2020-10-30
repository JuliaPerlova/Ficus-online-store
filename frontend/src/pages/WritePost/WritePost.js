import React from "react";
import "./WritePost.css";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  GET_CONTENT,
  GET_PREVIEW,
  GET_RESULT_REQUESTED,
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
    uploadUrl: "http://localhost:4000/main/upload_image",
    //withCredentials: true,
    headers: {
      "x-auth-token": `${localStorage.getItem("accessToken")}`,
    },
  },
};

const previewExtractor = (html, numOfextractNodes) => {
  const htmlToDom = new DOMParser().parseFromString(html, "text/html");
  const container = document.createElement("body");
  htmlToDom.body.childNodes.forEach((el) => {
    if (container.childNodes.length > numOfextractNodes) {
      return;
    }
    return container.append(el.cloneNode(true));
  });
  return container.innerHTML;
};

export const WritePost = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.writePostReducer.loading);
  const content = useSelector((store) => store.writePostReducer.content);
  const result = useSelector((store) => store.writePostReducer.result);

  return (
    <>
      <h1>WritePost page</h1>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data='<p>Write something ... </p>'
        onReady={(editor) => {
          // console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          //console.log({ event, editor, data });
          dispatch({ type: GET_CONTENT, payload: data });
          dispatch({
            type: GET_PREVIEW,
            payload: previewExtractor(content, 3),
          });
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
        onClick={() => dispatch({ type: GET_RESULT_REQUESTED })}
        loading={isLoading}
      >
        Create post
      </Button>
    </>
  );
};
