import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Input, Comment, Avatar, Badge } from "antd";

import { GET_PROFILE_INFO_REQUESTED } from "../../redux/actions/profileActions";
import {
  SET_CURRENT_COMMENT,
  SET_CURRENT_REPLY,
  WRITE_COMMENT_REQUESTED,
  WRITE_REPLY_REQUESTED,
} from "../../redux/actions/commentsActions";

const { TextArea } = Input;

export const CommentCreator = ({ isReply }) => {
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: GET_PROFILE_INFO_REQUESTED }), [dispatch]);
  const profileInfo = useSelector((store) => store.profileReducer.profileInfo);

  const currentComment = useSelector(
    (store) => store.commentsReducer.currentComment
  );

  const currentReply = useSelector(
    (store) => store.commentsReducer.currentReply
  );

  return (
    <>
      <Comment
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
            count={profileInfo && profileInfo.login}
          >
            <Avatar
              style={{
                backgroundColor: profileInfo && profileInfo.avatar,
                verticalAlign: "middle",
              }}
              size='large'
              gap={1}
            >
              {profileInfo.login && profileInfo.login.slice(0, 1).toUpperCase()}
            </Avatar>
          </Badge>
        }
        content={
          <>
            <Form.Item>
              <TextArea
                onChange={(event) => {
                  if (isReply) {
                    dispatch({
                      type: SET_CURRENT_REPLY,
                      payload: event.target.value,
                    });
                  } else {
                    dispatch({
                      type: SET_CURRENT_COMMENT,
                      payload: event.target.value,
                    });
                  }
                }}
                value={isReply ? currentReply : currentComment}
              />
            </Form.Item>
            <Form.Item>
              <Button
                disabled={
                  isReply
                    ? currentReply.length < 3 || currentReply.trim() === ""
                    : currentComment.length < 3 || currentComment.trim() === ""
                }
                htmlType='submit'
                type='primary'
                onClick={() => {
                  if (isReply) {
                    dispatch({ type: WRITE_REPLY_REQUESTED });
                  } else {
                    dispatch({ type: WRITE_COMMENT_REQUESTED });
                  }
                }}
              >
                Add Comment
              </Button>
            </Form.Item>
          </>
        }
      />
    </>
  );
};
