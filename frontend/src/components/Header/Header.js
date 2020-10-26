import React from "react";
import { PageHeader, Button } from "antd";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <PageHeader
      className='site-page-header'
      title='Blog'
      subTitle='This is a blog'
      extra={[
        <Link to='/signin'>
          <Button key='1'>Sign In</Button>
        </Link>,
        <Link to='signup'>
          <Button key='2' type='primary'>
            Sign Up
          </Button>
        </Link>,
      ]}
    />
  );
};
