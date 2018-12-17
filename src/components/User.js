import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Label, Image, Message } from 'semantic-ui-react';

class User extends React.Component {
  constructor(props) {
    super(props);

    const { getPlayer } = this.props;
    const { avatar, event, name, color } = getPlayer();

    this.state = {
      isBusy: false,
      avatar,
      event,
      name,
      color,
      errorMessage: ''
    };
  }

  logout = () => {
    const { deauthenticate, history, unAuthenticatedRedirect } = this.props;

    this.setState({ isBusy: true });

    deauthenticate({
      success: () => {
        history.push(unAuthenticatedRedirect);
      },
      failure: error => {
        this.setState({ isBusy: false, errorMessage: error });
      }
    });
  };

  render() {
    const { avatar, event, name, color, isBusy, errorMessage } = this.state;

    return (
      <div>
        <Button
          basic
          onClick={this.logout}
          icon="sign out"
          labelPosition="right"
          content="Sign Out"
          loading={isBusy}
        />
        {errorMessage && <Message negative>{errorMessage}</Message>}
        <br />
        <br />
        <Label color={color} image>
          <Image src={avatar} />
          {name}
          <Label.Detail>{event}</Label.Detail>
        </Label>
      </div>
    );
  }
}

export default withRouter(User);
