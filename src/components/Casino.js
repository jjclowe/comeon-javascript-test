import React from 'react';
import {
  Form,
  Input,
  Grid,
  Image,
  Icon,
  Menu,
  Loader,
  Header,
  Button,
  Segment,
  Container
} from 'semantic-ui-react';

export default class Casino extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      games: [],
      currentCategoryId: 0,
      currentFilterString: '',
      gameCode: null
    };

    // fetch categories
    fetch('/api/categories', {
      method: 'get'
    })
      .then(res => res.json())
      .then(res => {
        setTimeout(() => {
          // fake delay loading categories
          this.setState({ categories: res });
        }, 300);
      })
      .catch(() => {
        this.setState({ categories: [] });
      });

    // fetch games
    fetch('/api/games', {
      method: 'get'
    })
      .then(res => res.json())
      .then(res => {
        setTimeout(() => {
          // fake delay loading games
          this.setState({ games: res });
        }, 500);
      })
      .catch(() => {
        this.setState({ games: [] });
      });
  }

  componentDidMount() {
    this.filterInput.focus();
  }

  componentDidUpdate() {
    const { gameCode } = this.state;

    if (gameCode) comeon.game.launch(gameCode);
  }

  CategoryMenu = () => {
    const { currentCategoryId, categories } = this.state;
    const MenuItems = [];

    categories.forEach(category => {
      MenuItems.push(
        <Menu.Item
          active={currentCategoryId === category.id}
          id={category.id}
          key={category.id}
          name={category.name}
          onClick={this.handleCategoryClick}
        />
      );
    });

    if (MenuItems.length) {
      return (
        <div>
          <Header as="h3">Categories</Header>
          <Menu vertical>{MenuItems}</Menu>
        </div>
      );
    }
    return <Loader active />;
  };

  GamesMenu = () => {
    const { games, currentFilterString, currentCategoryId } = this.state;
    const GridItems = [];

    games.forEach(game => {
      const nameAndDescription = `${game.name.toLowerCase()} ${game.description.toLowerCase()}`;
      const filterPass = nameAndDescription.indexOf(currentFilterString) === -1;
      const categoryPass = !game.categoryIds.includes(currentCategoryId);

      if (!filterPass && !categoryPass) {
        GridItems.push(
          <Grid.Row key={game.code}>
            <Grid.Column width={4}>
              <Image src={game.icon} />
            </Grid.Column>
            <Grid.Column width={12}>
              <Header as="h2">{game.name}</Header>
              <p>{game.description}</p>
              <Button
                secondary
                id={game.code}
                onClick={this.handleGameClick}
                icon
                labelPosition="right"
                floated="right"
              >
                Play
                <Icon name="play" />
              </Button>
            </Grid.Column>
          </Grid.Row>
        );
      }
    });

    if (GridItems.length)
      return (
        <div>
          <Grid divided="vertically">{GridItems}</Grid>
        </div>
      );

    return <Loader active />;
  };

  Game = () => {
    return (
      <Container>
        <br />
        <Button secondary onClick={this.handleCasinoClick} icon labelPosition="left">
          Back
          <Icon name="arrow left" />
        </Button>
        <br />
        <br />
        <div id="game-launch" />
      </Container>
    );
  };

  handleFilterChange = event => {
    const { value } = event.target;
    this.setState({ currentFilterString: value });
  };

  handleCategoryClick = event => {
    const { id } = event.target;
    this.setState({ currentCategoryId: parseInt(id, 10), currentFilterString: '' }); // clear current filter
  };

  handleGameClick = event => {
    this.setState({ gameCode: event.target.id });
  };

  handleCasinoClick = () => {
    this.setState({ gameCode: null });
  };

  render() {
    const { gameCode, currentFilterString } = this.state;

    return (
      <div>
        {gameCode ? (
          <this.Game />
        ) : (
          <Grid>
            <Grid.Row>
              <Grid.Column floated="right" width={4}>
                <Form.Field>
                  <Input
                    ref={input => {
                      this.filterInput = input;
                    }}
                    placeholder="Search Game"
                    icon="search"
                    onChange={this.handleFilterChange}
                    autoComplete="off"
                    type="text"
                    value={currentFilterString}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={12}>{<this.GamesMenu />}</Grid.Column>
              <Grid.Column width={4}>{<this.CategoryMenu />}</Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
    );
  }
}
