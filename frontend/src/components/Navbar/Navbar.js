import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Menu mode='horizontal'>
      <Menu.Item>
        <Link to='/'>Posts</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/write_post'>Write a post</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/profile'>Profile</Link>
      </Menu.Item>
    </Menu>
  );
};
