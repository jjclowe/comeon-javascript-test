import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Label, Image, Icon } from 'semantic-ui-react';

class User extends React.Component {
  constructor(props) {
    super(props);

    const { getPlayer } = this.props;
    const { avatar, event, name, color } = getPlayer();

    this.state = {
      avatar,
      event,
      name,
      color
    };
  }

  logout = () => {
    const { deauthenticate, history, unAuthenticatedRedirect } = this.props;

    deauthenticate(() => {
      history.push(unAuthenticatedRedirect);
    });
  };

  render() {
    const { avatar, event, name, color } = this.state;

    return (
      <div>
        <Button basic onClick={this.logout} size="tiny" icon labelPosition="right">
          Sign Out
          <Icon name="sign out" />
        </Button>
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
