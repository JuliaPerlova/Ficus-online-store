import React, { useEffect } from "react";
import "./Posts.css";
import { Pagination, Layout, Spin, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { PostPreview } from "../../components/PostPreview/PostPreview";
import {
  GET_CURRENT_PAGE,
  GET_POSTS_REQUSETED,
} from "../../redux/actions/postsActions";

const { Footer } = Layout;

export const Posts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchPosts() {
      dispatch({ type: GET_POSTS_REQUSETED });
    }
    fetchPosts();
  }, [dispatch]);

  const pageSelectionHandler = (currentPage) => {
    dispatch({ type: GET_CURRENT_PAGE, payload: currentPage });
    dispatch({ type: GET_POSTS_REQUSETED });
  };

  const posts = useSelector((store) => store.postsReducer.posts.posts);
  const totalPages = useSelector((store) => store.postsReducer.posts.amount);
  const currentPage = useSelector((store) => store.postsReducer.currentPage);

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
              likes={post.likes.length}
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
          current={currentPage}
          total={totalPages}
          pageSize={5}
          showQuickJumper='true'
          onChange={pageSelectionHandler}
        />
      </Footer>
    </>
  );
};
