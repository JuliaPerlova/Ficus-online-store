import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { ModalComponent } from "../../components/ModalComponent/ModalComponent";

import {
  GET_PROFILE_INFO_REQUESTED,
  OPEN_MODAL,
  CLOSE_MODAL,
} from "../../redux/actions/profileActions";

const { Meta } = Card;

export const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch({ type: GET_PROFILE_INFO_REQUESTED }), [dispatch]);

  const profileInfo = useSelector((store) => store.profileReducer.profileInfo);

  const modalIsOpen = useSelector((store) => store.profileReducer.modalIsOpen);

  const showModal = () => dispatch({ type: OPEN_MODAL });

  const handleOk = () => dispatch({ type: CLOSE_MODAL });

  const handleCancel = () => dispatch({ type: CLOSE_MODAL });

  return (
    <>
      <Card
        style={{ width: 300, margin: "0 auto", marginTop: 16 }}
        title='Profile'
        extra={
          <EditOutlined
            onClick={() => showModal()}
            style={{ cursor: "pointer" }}
          />
        }
      >
        <Meta
          avatar={
            <Avatar
              style={{
                backgroundColor: profileInfo.avatar,
                verticalAlign: "middle",
              }}
              size='large'
              gap={1}
            >
              {profileInfo.login && profileInfo.login.slice(0, 1).toUpperCase()}
            </Avatar>
          }
          title={`Username: ${profileInfo.login}`}
          description={`Email: ${profileInfo.email}`}
        />
      </Card>
      <ModalComponent
        modalIsOpen={modalIsOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        profileInfo={profileInfo}
      />
    </>
  );
};
