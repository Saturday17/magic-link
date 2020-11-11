import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { getData, getAuthorized, setAuthorized, getCurrentUser, setCurrentUser } from "../../../services/storage/local-storage";

import './account-activation-page.css';

class AccountActivationPage extends Component {

  state = {
    username: '',
    authorizedUsers: []
  }
 
  activateLink = (prevPageUrl, hash) => {
    const { username, authorizedUsers } = this.state;

    if (prevPageUrl === 'login') {
      authorizedUsers.push(username);
      setAuthorized(authorizedUsers);
      setCurrentUser(username);
      this.props.history.push('/dashboard');
    } else if (prevPageUrl === 'signup') {
      authorizedUsers.push(username);
      setAuthorized(authorizedUsers);
      this.props.history.push('/login');
    } else {
      this.props.history.push(`/reset/${hash}/changepassword`);
    }
  }

  componentDidMount() {
    const data = getData();
    const authorizedUsers = getAuthorized();
    const hash = window.location.pathname.substring(window.location.pathname.indexOf('/', 1) + 1);
    
    const currentUser = getCurrentUser();
    if (currentUser) {
      this.props.history.push('/dashboard');
    }
    const foundedUser = data.find((user) => user.hash === hash);
    if (!foundedUser) {
      this.props.history.push('/signup');
    }
    this.setState({
      username: foundedUser.username,
      authorizedUsers
    });
  }

  render() {
    const prevPageUrl = window.location.pathname.substring(1, window.location.pathname.indexOf('/', 1));
    const hash = window.location.pathname.substring(window.location.pathname.indexOf('/', 1) + 1);
    
    return (
      <div className="container">
        <div className="activation">
          <h2>Verify your e-mail</h2>
          <div className="magic-link">
          { prevPageUrl === 'signup' && 'Please, press "Magic link" to activate your account' }
          { prevPageUrl === 'login' && 'Your account is not activated. Please press "Magic link" to activate magic link' }
          { prevPageUrl === 'reset' && 'Please, press "Magic link" to change your password' }
          </div>
          <span onClick={ () => this.activateLink(prevPageUrl, hash) } className="link-button">Magic link</span>
        </div>
      </div>
    );
  }
}

export default AccountActivationPage;