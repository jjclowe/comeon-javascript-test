import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Input, Grid, Message, Header } from 'semantic-ui-react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isBusy: false,
      errorMessage: '',
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    this.usernameInput.focus();
  }

  handleChange = (event, data) => {
    this.setState({
      [data.id]: data.value
    });
    return true;
  };

  validateForm = () => {
    const { username, password } = this.state;
    return username.length > 0 && password.length > 0;
  };

  login = () => {
    const { username, password } = this.state;
    const { authenticate, history, authenticatedRedirect } = this.props;

    if (!this.validateForm()) return false;

    this.setState({ isBusy: true });

    authenticate(
      { username, password },
      {
        success: () => {
          history.push(authenticatedRedirect);
        },
        failure: error => {
          this.setState({ isBusy: false, errorMessage: error });
        }
      }
    );
  };

  render() {
    const { isBusy, errorMessage } = this.state;

    return (
      <Grid padded="vertically">
        <Grid.Row centered>
          <Grid.Column width={5}>
            <Form onSubmit={this.login} loading={isBusy}>
              <Header as="h2">Please sign in</Header>
              <Form.Field>
                <Input
                  ref={input => {
                    this.usernameInput = input;
                  }}
                  id="username"
                  placeholder="Username"
                  icon="user"
                  onChange={this.handleChange}
                  autoComplete="off"
                  type="text"
                />
              </Form.Field>
              <Form.Field>
                <Input
                  id="password"
                  placeholder="Password"
                  icon="lock"
                  onChange={this.handleChange}
                  autoComplete="off"
                  type="password"
                />
              </Form.Field>
              {errorMessage && <Message negative>{errorMessage}</Message>}
              <Button
                secondary
                type="submit"
                icon="sign in"
                labelPosition="right"
                content="Sign In"
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default withRouter(Login);
