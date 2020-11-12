import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Input, Comment, Avatar, Badge } from "antd";

import { GET_PROFILE_INFO_REQUESTED } from "../../redux/actions/profileActions";
import {
  SET_CURRENT_COMMENT,
  WRITE_COMMENT_REQUESTED,
} from "../../redux/actions/commentsActions";

const { TextArea } = Input;

export const CommentCreator = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch({ type: GET_PROFILE_INFO_REQUESTED }), [dispatch]);
  const profileInfo = useSelector((store) => store.profileReducer.profileInfo);

  const currentComment = useSelector(
    (store) => store.commentsReducer.currentComment
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
                onChange={(event) =>
                  dispatch({
                    type: SET_CURRENT_COMMENT,
                    payload: event.target.value,
                  })
                }
                value={currentComment}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType='submit'
                type='primary'
                onClick={() => dispatch({ type: WRITE_COMMENT_REQUESTED })}
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
