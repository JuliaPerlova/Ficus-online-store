import React from "react";
import { Form, Input, Button, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { signIn, resendCode } from "../../api";
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
      console.log(response);
      if (response === "Confirm your email") {
        resendCode(values.email);
        history.push("/email_confirm");
      }
      message.error(response, 3);
    }
  };

  return (
    <>
      <h2>Welcome</h2>
      <Form name='signin' className='form' size='large' onFinish={onFinish}>
        <Form.Item
          name='email'
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            { required: true, message: "Please fill the field" },
          ]}
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
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/m,
              message:
                "Password must contain capital, lowercase letters and numbers and also have length of 6 to 20 characters",
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
