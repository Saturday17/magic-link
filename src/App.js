import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';

import DashboardPage from './components/pages/dashboard-page/dashboard-page';
import LoginPage from './components/pages/login-page/login-page';
import SignupPage from './components/pages/signup-page/signup-page';
import PasswordResetPage from './components/pages/password-reset-page/password-reset-page';
import AccountActivationPage from './components/pages/account-activation-page/account-activation-page';

import './App.css';

function App() {
  return (
    <div className="main">
      <Router history={ createBrowserHistory() }>
        <Switch>
          <Route exact path='/dashboard' component={ DashboardPage } />
          <Route exact path='/login' component={ LoginPage } />
          <Route exact path='/signup' component={ SignupPage } />
          <Route exact path='/reset' component={ PasswordResetPage } />
          <Route exact path='/signup/:username' component={ AccountActivationPage } />
          <Route exact path='/login/:hash' component={ AccountActivationPage } />
          <Route exact path='/reset/:hash' component={ AccountActivationPage } />
          <Route exact path='/reset/:hash/changepassword' component={ PasswordResetPage } />
          <Redirect from="/" to="/signup" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
