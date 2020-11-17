import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Upload, message, Form, Input, Button } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import "./ModalComponent.css";

import {
  GET_AVATAR_REQUESTED,
  SET_FILE,
} from "../../redux/actions/profileActions";

export const ModalComponent = ({
  modalIsOpen,
  handleOk,
  handleCancel,
  profileInfo,
}) => {
  const dispatch = useDispatch();

  const loading = useSelector((store) => store.profileReducer.loading);
  const avatarUrl = useSelector((store) => store.profileReducer.avatarUrl);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const avatarUpload = (event) => {
    dispatch({ type: SET_FILE, payload: event.file });
    dispatch({ type: GET_AVATAR_REQUESTED });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Avatar</div>
    </div>
  );

  const onFinish = async (values) => {
    console.log(values);
  };

  const [changePassIsClicked, setChangePass] = useState(false);

  return (
    <Modal
      title='Edit profile'
      visible={modalIsOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className='container'>
        <div className='avatar'>
          <Upload
            name='avatar'
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={avatarUpload}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt='avatar' style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div className='userInfo'>
          <Form
            name='profile'
            className='form'
            size='large'
            onFinish={onFinish}
          >
            <Form.Item name='firstName'>
              <Input prefix={<UserOutlined />} placeholder='First name' />
            </Form.Item>
            <Form.Item name='lastName'>
              <Input prefix={<UserOutlined />} placeholder='Last name' />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => setChangePass((state) => !state)}
                size='small'
              >
                Change password
              </Button>
              {changePassIsClicked ? (
                <>
                  <Form.Item
                    style={{ marginTop: 24 }}
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
                    hasFeedback
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder='New password'
                    />
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
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder='Confirm new password'
                    />
                  </Form.Item>
                </>
              ) : null}
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
