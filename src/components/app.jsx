import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import TokenManager from '../utils/token-manager';
import Signup from './signup';
import Login from './login';
import Profile from './profile';
import Navbar from './navigation/navbar';
import MobileNav from './navigation/mobile-nav';
import Backdrop from './navigation/backdrop';

const Search = loadable(() => import('./search'));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: TokenManager.isTokenValid() ? TokenManager.getTokenPayLoad() : null,
      mobileNavOpen: false,
    };
  }

  componentDidMount() {
    this.checkAuth();
  }

  componentDidUpdate() {
    this.checkAuth();
  }

  handleLogin = () => {
    this.setState({ user: TokenManager.getTokenPayLoad() });
  };

  handleLogout = () => {
    TokenManager.removeToken();
    this.setState({
      user: null,
    });
    const { history } = this.props;
    history.push('/');
  };

  isLoggedIn = () => {
    const { user } = this.state;
    return Boolean(user) && TokenManager.isTokenValid();
  };

  checkAuth = () => {
    const { history, location } = this.props;
    if (location.pathname !== '/signup' && location.pathname !== '/' && !this.isLoggedIn()) {
      history.push('/');
    }
  };

  handleMobileNavToggle = () => {
    this.setState((prevState) => {
      return { mobileNavOpen: !prevState.mobileNavOpen };
    });
  };

  handleMobileNavClose = () => {
    this.setState({ mobileNavOpen: false });
  };

  render() {
    const { mobileNavOpen } = this.state;

    let mobileNav;
    let backdrop;
    if (mobileNavOpen) {
      mobileNav = (
        <MobileNav
          onCloseNav={this.handleMobileNavClose}
          isLoggedIn={this.isLoggedIn()}
          onLogout={this.handleLogout}
        />
      );
      backdrop = <Backdrop onCloseNav={this.handleMobileNavClose} />;
    }
    return (
      <Fragment>
        <Navbar
          isLoggedIn={this.isLoggedIn()}
          onLogout={this.handleLogout}
          onToggleMobileNav={this.handleMobileNavToggle}
        />
        {mobileNav}
        {backdrop}
        <Switch>
          <Route
            exact
            path="/"
            render={(routerProps) => <Login {...routerProps} onLogin={this.handleLogin} />}
          />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/profile/:id" component={Profile} />
        </Switch>
      </Fragment>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(App);
