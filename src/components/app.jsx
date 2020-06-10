import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TokenManager from '../utils/token-manager';
import Search from './search';
import Signup from './signup';
import Login from './login';
import Profile from './profile';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: TokenManager.isTokenValid() ? TokenManager.getTokenPayLoad() : null,
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

  render() {
    return (
      <Fragment>
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
