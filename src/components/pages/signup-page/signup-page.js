import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { getHashCode } from "../../../services/hash-generator";
import { getData, setData, getCurrentUser } from "../../../services/storage/local-storage";

import './signup-page.css';

class SignupPage extends Component {

  state = {
    username: '',
    password: '',
    confirmPassword: '',
    error: '',
    data: getData()
  }

  submitForm = (e) => {
    e.preventDefault();
    const { username, password, confirmPassword, data } = this.state;
    this.setState({ error: '' });

    if (password !== confirmPassword) {
      this.setState({ error: 'passwords don`t match' });
    } else {
      let isExist = false;
      data.forEach(user => {
        if (username === user.username) {
          isExist = true
        } 
      });
      
      if (isExist) {
        this.setState({ error: 'user with this name already exists' });
      } else {
        const hash = getHashCode(username);
        data.push({ username, password, hash });
        setData(data);
        this.props.history.push(`/signup/${hash}`);
      }
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

  setConfirmPassword = (confirmPassword) => {
    this.setState({
      confirmPassword
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
        <h2>Sign up</h2>
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
              <input
                required
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                placeholder='Confirm your password'
                onChange={ (e) => this.setConfirmPassword(e.target.value) }
              />
            <small>{this.state.error}</small>
            <input type='submit' id='signup' className="submit" name='signup' value='Sign up' />
            <span>Already have an account? </span>
            <Link to='/login'>Login</Link>
        </form>
      </div>
    );
  }
}

export default SignupPage;