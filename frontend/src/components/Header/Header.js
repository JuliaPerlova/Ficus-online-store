import React from "react";
import { PageHeader, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../api";
import { DELETE_TOKEN } from "../../redux/actions/authActions";

export const Header = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector((store) => store.authReducer.isAuth);

  const history = useHistory();

  const deleteToken = async () => {
    await logout();
    localStorage.clear();
    dispatch({ type: DELETE_TOKEN });
    history.push("/");
  };

  return (
    <PageHeader
      className='site-page-header'
      title='Blog'
      subTitle='This is a blog'
      extra={[
        <div key='4'>
          {!isAuth ? (
            <>
              <Link to='/signin'>
                <Button key='1'>Sign In</Button>
              </Link>
              <Link to='/signup'>
                <Button key='2' type='primary'>
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <Button type='primary' onClick={() => deleteToken()}>
              Log out
            </Button>
          )}
        </div>,
      ]}
    />
  );
};
