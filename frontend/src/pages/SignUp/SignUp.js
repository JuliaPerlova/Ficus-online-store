import React, { useState } from "react";
import "./SignUp.css";
import { Form, Input, Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

export const SignUp = () => {
  const onFinish = (values) => {
    console.log(values);
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
          name='username'
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
