import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';

import {
  GET_CURRENT_POST_ID,
  GET_POST_REQUSETED,
} from '../../redux/actions/postsActions';

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
};

export const Post = () => {
  const { postId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_CURRENT_POST_ID, payload: postId });
    dispatch({ type: GET_POST_REQUSETED });
  }, [dispatch, postId]);

  const content = useSelector((store) => store.postsReducer.currentPost.body);

  return (
    <div>
      <h1>{postId}</h1>
      {content && (
        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          data={content.text}
          disabled={true}
        />
      )}
    </div>
  );
};
