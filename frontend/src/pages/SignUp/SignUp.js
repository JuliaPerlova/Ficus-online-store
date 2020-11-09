import React from "react";
import "./SignUp.css";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { signUp } from "../../api";

export const SignUp = () => {
  const history = useHistory();

  const onFinish = async (values) => {
    const response = await signUp({
      email: values.email,
      login: values.login,
      password: values.password,
    });
    if (!response._id) {
      message.error(response.message, 3);
    } else {
      localStorage.setItem("_id", response._id);
      history.push("/email_confirm");
    }
  };

  return (
    <>
      <h2>Registration form</h2>
      <Form name='signup' className='form' size='large' onFinish={onFinish}>
        <Form.Item
          name='email'
          rules={[{ required: true, message: "Please fill the field" }]}
        >
          <Input prefix={<MailOutlined />} placeholder='Email' />
        </Form.Item>
        <Form.Item
          name='login'
          rules={[{ required: true, message: "Please fill the field" }]}
        >
          <Input prefix={<UserOutlined />} placeholder='Username' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input prefix={<LockOutlined />} placeholder='Password' />
        </Form.Item>
        <Form.Item
          name='confirm'
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input prefix={<LockOutlined />} placeholder='Confirm password' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
