import React, { useEffect } from "react";
import "./Posts.css";
import { Pagination, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { Post } from "../../components/Post/Post";
import { getPosts } from "../../api";
import {
  GET_CURRENT_PAGE,
  GET_INITIAL_POSTS,
  GET_POSTS_REQUSETED,
} from "../../redux/actions/postsActions";

const { Footer } = Layout;

export const Posts = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    const response = await getPosts();
    dispatch({ type: GET_INITIAL_POSTS, payload: response });
  }, []);

  const pageSelectionHandler = (currentPage) => {
    dispatch({ type: GET_CURRENT_PAGE, payload: currentPage });
    dispatch({ type: GET_POSTS_REQUSETED });
  };

  const posts = useSelector((store) => store.postsReducer.posts);

  return (
    <>
      {posts.map((post) => {
        return <Post preview={post.body.preview} />;
      })}
      <Footer>
        <Pagination
          total={50}
          pageSize={5}
          showQuickJumper='true'
          onChange={pageSelectionHandler}
        />
      </Footer>
    </>
  );
};
