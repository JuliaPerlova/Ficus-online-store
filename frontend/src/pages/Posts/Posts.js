import React, { useEffect } from "react";
import "./Posts.css";
import { Pagination, Layout, Spin, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { PostPreview } from "../../components/PostPreview/PostPreview";
import { getPosts } from "../../api";
import {
  GET_CURRENT_PAGE,
  GET_INITIAL_POSTS,
  GET_POSTS_REQUSETED,
} from "../../redux/actions/postsActions";

const { Footer } = Layout;

export const Posts = () => {
  const dispatch = useDispatch();

  // useEffect(async () => {
  //   const response = await getPosts();
  //   dispatch({ type: GET_INITIAL_POSTS, payload: response });
  // }, []);

  useEffect(() => {
    async function fetchPosts() {
      const response = await getPosts();
      dispatch({ type: GET_INITIAL_POSTS, payload: response });
    }
    fetchPosts();
  }, [dispatch]);

  const pageSelectionHandler = (currentPage) => {
    dispatch({ type: GET_CURRENT_PAGE, payload: currentPage });
    dispatch({ type: GET_POSTS_REQUSETED });
  };

  const posts = useSelector((store) => store.postsReducer.posts.posts);
  const totalPages = useSelector((store) => store.postsReducer.posts.amount);

  return (
    <>
      {posts ? (
        posts.map((post) => {
          return (
            <PostPreview
              key={post._id}
              postId={post._id}
              preview={post.body.preview}
              avatarColour={post.author.avatar}
              username={post.author.login}
            />
          );
        })
      ) : (
        <Space size='middle' style={{ marginTop: 35 }}>
          <Spin size='large' />
        </Space>
      )}
      <Footer>
        <Pagination
          total={totalPages}
          pageSize={5}
          showQuickJumper='true'
          onChange={pageSelectionHandler}
        />
      </Footer>
    </>
  );
};
