import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  FileTextOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const isAuth = useSelector((store) => store.authReducer.isAuth);

  return (
    <Menu mode='horizontal'>
      <Menu.Item icon={<FileTextOutlined />}>
        <Link to='/'>Posts</Link>
      </Menu.Item>
      {isAuth ? (
        <>
          <Menu.Item icon={<EditOutlined />}>
            <Link to='/write_post'>Write a post</Link>
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />}>
            <Link to='/profile'>Profile</Link>
          </Menu.Item>
        </>
      ) : null}
    </Menu>
  );
};
