import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  FileTextOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const Navbar = () => {
  const token = localStorage.getItem("token");
  return (
    <Menu mode='horizontal'>
      <Menu.Item icon={<FileTextOutlined />}>
        <Link to='/'>Posts</Link>
      </Menu.Item>
      {token ? null : (
        <>
          <Menu.Item icon={<EditOutlined />}>
            <Link to='/write_post'>Write a post</Link>
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />}>
            <Link to='/profile'>Profile</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};
