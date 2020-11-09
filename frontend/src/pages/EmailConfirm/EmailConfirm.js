import React from "react";
import { Form, Input, Button, message } from "antd";
import { UnlockOutlined } from "@ant-design/icons";
import { emailConfirm } from "../../api";
import { useHistory } from "react-router-dom";

export const EmailConfirm = () => {
  const history = useHistory();
  const onFinish = async (values) => {
    const response = await emailConfirm({
      code: values.confirmationCode,
    });
    console.log(response);
    if (!response) {
      message.error("Wrong code or something went wrong!", 3);
    } else {
      history.push("/signin");
    }
  };

  return (
    <>
      <h2>Please confirm your email</h2>
      <Form name='signin' className='form' size='large' onFinish={onFinish}>
        <Form.Item
          name='confirmationCode'
          rules={[
            {
              required: true,
              message: "Please input confiramtion code!",
            },
          ]}
        >
          <Input prefix={<UnlockOutlined />} placeholder='Confirmation code' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
