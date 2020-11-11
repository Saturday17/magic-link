import React, { Component } from 'react';
import { getHashCode } from "../../../services/hash-generator";
import { getData, setData } from "../../../services/storage/local-storage";

import './password-reset-page.css';

class PasswordResetPage extends Component {

  state = {
    username: '',
    password: '',
    confirmPassword: '',
    error: '',
    data: getData()
  }

  submitUser = (e) => {
    e.preventDefault();
    const { username, error, data } = this.state;
    let isUser = false;
    data.forEach(user => {
      if (username === user.username) {
        isUser = true;
      }
    });
    if (isUser) {
      const hash = getHashCode(username);
      this.props.history.push(`/reset/${hash}`);
      this.setState({ error });
    } else {
      this.setState({ error: 'user with this name does not exist' });
    }
  }

  submitPassword = (e) => {
    const { username, password, confirmPassword, data } = this.state;
    e.preventDefault();
    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords don`t match' })
    } else {
      const updatedData = data.map(user => {
        if (user.username === username) {
          user.password = password;
        }
        return user;
      })
      setData(updatedData);
      this.setState({ error: '' });
      alert('Password changed');
      this.props.history.push("/login");
    }
  }

  setUsername = (username) => {
    this.setState({ username });
  }

  setPassword = (password) => {
    this.setState({ password });
  }

  setConfirmPassword = (confirmPassword) => {
    this.setState({ confirmPassword });
  }

  componentDidMount() {
    const data = getData();
    setData(data);
    const isChangepassUrl = window.location.pathname.includes('changepassword');
    if (isChangepassUrl) {
      const hash = window.location.pathname.substring(window.location.pathname.indexOf('/', 1) + 1, window.location.pathname.indexOf('/changepassword'));
      const user = data.find(user => user.hash === hash);
      if (!user) {
        this.props.history.push("/signup");
      }
      this.setState({ username: user.username });
    }
  }

  render() {
    const isChangepassUrl = window.location.pathname.includes('changepassword');

    return (
      <div className="container">
        <h1>Reset password</h1>
        {
          isChangepassUrl ?
            <form onSubmit={ this.submitPassword } className="form">
               <input
                required
                type='text'
                id='username'
                name='username'
                value={this.state.username}
                disabled
              />
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Your new password...'
                onChange={(e) => this.setPassword(e.target.value)}
                required
              />
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                placeholder='Confirm password...'
                onChange={(e) => this.setConfirmPassword(e.target.value)}
                required
              />
              <small>{this.state.error}</small>
              <input type='submit' id='reset' className="submit" name='reset' value='Reset' />
            </form> :
            <form onSubmit={ this.submitUser } className="form">
              <input
                  required
                  type='text'
                  id='username'
                  name='username'
                  placeholder='Type your username'
                  onChange={(e) => this.setUsername(e.target.value)} />
              <small>{this.state.error}</small>
              <input type='submit' id='reset' className="submit" name='reset' value="Reset"/>
            </form>
        }
      </div>
    );
  }
}

export default PasswordResetPage;