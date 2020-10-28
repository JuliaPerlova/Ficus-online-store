import React from "react";
import { Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

export const SignIn = () => {
  const onFinish = (values) => {
    console.log(values);
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
          hasFeedback
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
