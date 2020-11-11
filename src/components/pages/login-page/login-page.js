import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { getHashCode } from "../../../services/hash-generator";
import { getData, getAuthorized, getCurrentUser, setCurrentUser } from "../../../services/storage/local-storage";

import './login-page.css';

class LoginPage extends Component {
 
  state = {
    username: '',
    password: '',
    error: '',
    data: getData()
  }

  submitForm = (e) => {
    e.preventDefault();
    const { username, password, data } = this.state;
    let isCorrect = false;
    let isAuthorized = false;

    data.forEach(user => {
      if (username === user.username && password === user.password) {
        isCorrect = true;
      }
    });
    const authorizedUsers = getAuthorized();
    authorizedUsers.forEach((user) => user === username ? isAuthorized = true : isAuthorized = false);
    if (isCorrect) {
      if (isAuthorized) {
        this.setState({ error: '' });
        setCurrentUser(username);
        this.props.history.push('/dashboard');
      } else {
        const hash = getHashCode(username);
        this.props.history.push(`/login/${hash}`);
      }
    } else {
      this.setState({ error: 'incorrect name or password' });
    }
  }

  setUsername = (username) => {
    this.setState({
      username
    });
  }

  setPassword = (password) => {
    this.setState({
      password
    });
  }

  componentDidUpdate() {
    const currentUser = getCurrentUser();
    if (currentUser)
      this.props.history.push('/dashboard');
  }
  
  render() {
    return (
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={ this.submitForm } className="form">
          <input
                required
                type='text'
                id='username'
                name='username'
                placeholder='Type username'
                onChange={ (e) => this.setUsername(e.target.value) }
              />
              <input
                required
                type='password'
                id='password'
                name='password'
                placeholder='Type password'
                onChange={ (e) => this.setPassword(e.target.value) }
              />
            <small>{this.state.error}</small>
            <input type='submit' id='login' className="submit" name='login' value='Login' />
            <span>Haven`t got an account? </span>
            <Link to='/signup'>Sign up</Link>
            <span>Forgot your password?</span>
            <Link to='/reset'>Reset</Link>

        </form>
      </div>
    );
  }
}

export default LoginPage;