import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Container, Image } from 'semantic-ui-react';

import Login from './components/Login';
import User from './components/User';
import Casino from './components/Casino';

export default class ComeOn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      player: {}
    };
  }

  authenticate = (credentials, callbacks) => {
    fetch('/api/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          this.state.isAuthenticated = true;
          this.state.player = { username: credentials.username, ...res.player };
          setTimeout(() => {
            // fake login delay
            callbacks.success();
          }, 500);
        } else {
          setTimeout(() => {
            // fake login delay
            callbacks.failure();
          }, 500);
        }
      })
      .catch(res => {
        console.log(res);
      });
  };

  deauthenticate = callback => {
    const { player } = this.state;
    const { username } = player;
    fetch('/api/logout', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          this.state.isAuthenticated = false;
          setTimeout(() => {
            // fake logout delay
            if (callback) callback();
          }, 500);
        }
      })
      .catch(res => {
        console.log(res);
      });
  };

  getPlayer = () => {
    const { player } = this.state;
    return player;
  };

  PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = this.state;

    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    );
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <div>
        <Image
          src="./static/images/logo.svg"
          alt="logo"
          size="big"
          width="600"
          height="112"
          centered
        />
        <Container className="main">
          {isAuthenticated && (
            <User
              {...this.props}
              getPlayer={this.getPlayer}
              deauthenticate={this.deauthenticate}
              unAuthenticatedRedirect="/login"
            />
          )}
          <Switch>
            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
                  authenticate={this.authenticate}
                  authenticatedRedirect="/casino"
                />
              )}
            />
            <this.PrivateRoute path="/casino" component={Casino} />
            <Redirect from="/" to="/casino" />
          </Switch>
        </Container>
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <ComeOn />
  </Router>,
  document.getElementById('root')
);

module.hot.accept();
