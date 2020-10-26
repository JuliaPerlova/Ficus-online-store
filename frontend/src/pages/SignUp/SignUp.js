import React from "react";
import "./SignUp.css";
import { Form, Input, Button, Upload } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  InboxOutlined,
} from "@ant-design/icons";

export const SignUp = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form name='signup' className='form' onFinish={onFinish}>
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

      <Form.Item
        name='dragger'
        valuePropName='fileList'
        getValueFromEvent={normFile}
        noStyle
      >
        <Upload.Dragger name='files' action='/upload.do'>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>
            Click or drag your avatar to this area to upload
          </p>
          <p className='ant-upload-hint'>
            Support for a single or bulk upload.
          </p>
        </Upload.Dragger>
      </Form.Item>
    </Form>
  );
};

{
  /* <Form.Item
name="password"
label="Password"
rules={[
  {
    required: true,
    message: 'Please input your password!',
  },
]}
hasFeedback
>
<Input.Password />
</Form.Item>

<Form.Item
name="confirm"
label="Confirm Password"
dependencies={['password']}
hasFeedback
rules={[
  {
    required: true,
    message: 'Please confirm your password!',
  },
  ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }

      return Promise.reject('The two passwords that you entered do not match!');
    },
  }),
]}
>
<Input.Password />
</Form.Item> */
}
