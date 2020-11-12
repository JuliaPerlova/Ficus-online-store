import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar } from "antd";

import { GET_PROFILE_INFO_REQUESTED } from "../../redux/actions/profileActions";

const { Meta } = Card;

export const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch({ type: GET_PROFILE_INFO_REQUESTED }), [dispatch]);

  const profileInfo = useSelector((store) => store.profileReducer.profileInfo);

  return (
    <Card style={{ width: 300, margin: "0 auto", marginTop: 16 }}>
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
  );
};
