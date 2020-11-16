import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
import { Posts } from "./pages/Posts/Posts";
import { WritePost } from "./pages/WritePost/WritePost";
import { Profile } from "./pages/Profile/Profile";
import { EmailConfirm } from "./pages/EmailConfirm/EmailConfirm";
import { Post } from "./components/Post/Post";
import { Page404 } from "./pages/Page404/Page404";

import ProtectedRoute from "./hocs/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Navbar />
        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route exact path='/' component={Posts} />
          <Route path='/page/:page' component={Posts} />
          <ProtectedRoute path='/write_post' component={WritePost} />
          <ProtectedRoute path='/profile' component={Profile} />
          <Route path='/email_confirm' component={EmailConfirm} />
          <Route path='/post/:postId' component={Post} />
          <Route path='*' component={Page404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
