import React, { Component } from 'react';
import { getCurrentUser, setCurrentUser } from "../../../services/storage/local-storage";

import './dashboard-page.css';

class DashboardPage extends Component {

  state = {
    username: ''
  }

  logout = () => {
    setCurrentUser('');
    this.props.history.push('/login');
  }

  componentDidMount() {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      this.props.history.push('/login');
    }
    this.setState({ username: currentUser });
  }

  render() {
    return (
      <div className="container">
        <h1>Welcome, { this.state.username }!</h1>
        <button onClick={ this.logout } className="logout">Logout</button>
      </div>
    );
  }
}

export default DashboardPage;