# comeon-javascript-test

My submission of ComeOn's test for Javascript coders.

## Setup

### Install dependencies

```javascript
npm install
```

### Start dev environment

```javascript
npm start
```

### Test user accounts

Use the following details to test user account functionality:

```
rebecka:secret
eric:dad
stoffe:rock
```

## Assignment Overview

The assignment is to use Javascript to tie together existing HTML and data to create a minimal, working casino website.

Basic HTML, CSS, images and JSON data is provided, however, feel free to impress by changing and enhancing any of these parts for an even better experience!

Your mission is to provide the Javascript code that makes the parts work as described, below.
**Feel free to use any other openly available library for validation, templating, dependency injection, etc.**

## Assignment Criteria

We want to see how you approach and solve a problem, as well as look at code style and quality.
Do take your time to do it right, rather than fast.
Extra effort to improve on the "website" will be noted. :)

While the test is primarily focused on Javascript, by all means use or change the HTML or CSS when that makes sense.

Be prepared to discuss your choices and code when delivered.

These parts needs all to be completed for the assignment to be complete:

### Login functionality

- Connect the login form to the /login ajax call.
- On valid username/password, transition to the games list screen.
- On invalid username/password, provide feedback and allow to try again.

### Log out functionality

- Connect the log out button to the /logout ajax call.
- On valid log out, transition to login screen with empty input fields.

### Games list screen

- Requires user to be logged in
- List all games from the /games ajax call.
- List categories from /categories ajax call.
- Provide functionality for filtering by typing.
- Provide functionality to filter by category.
- Make it possible to start a game by clicking on the play icon.

### Game play screen

- Requires user to be logged in
- Load the selected game via the provided API
- Provide a way to go back to the Games list screen
