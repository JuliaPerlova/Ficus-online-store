import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import {
  GET_CURRENT_POST_ID,
  GET_POST_REQUSETED,
  // GET_POST,
} from "../../redux/actions/postsActions";
// import { getPost } from "../../api";

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
      {content && ReactHtmlParser(content.text)}
    </div>
  );
};
