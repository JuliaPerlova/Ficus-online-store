import React from "react";
import { Form, Input, Button, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { signIn } from "../../api";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { SET_ACCESS_TOKEN } from "../../redux/actions/authActions";

export const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = async (values) => {
    const response = await signIn({
      email: values.email,
      password: values.password,
    });

    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
      dispatch({
        type: SET_ACCESS_TOKEN,
        payload: localStorage.getItem("accessToken"),
      });
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("_id", response.id);
      history.push("/");
    } else {
      message.error(response.message, 3);
    }
  };

  return (
    <>
      <h2>Welcome</h2>
      <Form name='signin' className='form' size='large' onFinish={onFinish}>
        <Form.Item
          name='email'
          rules={[{ required: true, message: "Please fill the field" }]}
        >
          <Input prefix={<MailOutlined />} placeholder='Email' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input prefix={<LockOutlined />} placeholder='Password' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
