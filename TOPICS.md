# Topics

## Table of contents

[TOC]

## Before we start

### Install local (global) package dependencies

* Git
* Node (NPM)
* Bower
* Webpack
* Babel

### .profile/.zshr config

```
# -------------------------------------------------------------------
# Git aliases
# -------------------------------------------------------------------

alias ga='git add'
alias gco='git checkout'
alias gst='git status'
alias gc='git commit'

# -------------------------------------------------------------------
# Other aliases
# -------------------------------------------------------------------

alias lsa='ls -la'
alias cl='clear'

# -------------------------------------------------------------------
# FUNCTIONS
# -------------------------------------------------------------------

function ws () {
  open -a /Applications/WebStorm.app/ $1
}

# Create directory and cd to it
function take () {
    mkdir $1
    cd $1
}
```

## Git

### Create folder and initialize git
* Open iterm
* ```$ cd to/dir```
* ```$ take ida-fronteers```
* ```$ git init```
* ```$ lsa```

### Create README.md file
* ```$ vim README.md```
* insert(i)
* ```# ida-fronteers```
* esc ```$ :wq ```

### Create .gitignore file
* ```$ vim .gitignore```
* insert(i)
```
.DS_Store
.idea/
node_modules/
dist/
*.log
```
* esc ```$ :wq ```

### Add files to git and commit changes
* ```$ ga .```
* ```$ gc -m "Initial commit"```

## NPM
* ```$ npm init```
* ```$ npm install -D auto-prefixer babel-core babel-eslint babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0 babel-runtime bootstrap-loader css-loader file-loader node-sass open postcss-loader react-hot-loader resolve-url-loader sass-loader style-loader url-loader webpack webpack-dev-server```
* ```$ npm install -S bootstrap-sass bootswatch flux history keymirror react react-bootstrap react-dom react-router react-router-bootstrap react-router-component underscore react-addons-css-transition-group```

## Using webstorm
* ```ws .```
* Webstorm is recognising npm and git in the project.

## Webpack

### Configure webpack js file
* Create new js file named: `webpack.config`
```
const path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('auto-prefixer');

module.exports = {
  devtool: 'eval',
  devserver: {
    port: '3010',
    browser: 'default'
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=stage-0&presets[]=react'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss-loader!sass?sourceMap',
        exclude: /node_modules/},
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loaders: [ 'url?limit=10000']
      }
    ],
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
  }
};
```

### Set up a dev server
* Create new js file named: `server`
```
const webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('./webpack.config'),
    open = require("open"),
    port = config.devserver.port,
    browser = config.devserver.browser;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    console.error(err);
  }

  var url = `http://localhost:${port}`;
  console.info(`Listening at ${url}`);

  if (!browser || browser === 'default') {
    open(url);
  } else {
    open(url, browser);
  }

});
```

### Define NPM task to run dev server
* open `package.json`
* remove test scripts and add a start task: `"start": "node server.js"`

## Quick Hello Fronteers app with ReactJS

### HTML
* Create a .html file named `index`
```
<html>
  <head>
    <title>Fronteers Demo App</title>
  </head>
  <body>
    <div id='app'>
    </div>
    <script src="/static/bundle.js"></script>
  </body>
</html>
```

### Javascript
* Create a new folder named `src` in the root folder
* Create a .js file named `index` in the src folder
```
import React from 'react';
import ReactDOM from 'react-dom';

require('./index.scss');

ReactDOM.render(<App />, document.getElementById('app'));
```

* cmd + J ```rcls``` App
* In render:
```
<div>
    <h1>Hello Fronteers!</h1>
</div>
```

### Add Assests
* Create a new folder named `assets` in the src folder
* Create a new folder named `fonts` in the assets folder
* Add the fonts (DS digit)

### Styling with SCSS
* Create a .scss file named `index` in the src folder

```
/**
* Index Stylesheet
*/

// Fonts
$icon-font-path: "../node_modules/bootstrap-sass/assets/fonts/bootstrap/";

@font-face {
  font-family: 'ds-digitalbold';
  src: url('assets/fonts/ds-digib/ds-digib-webfont.eot');
  src: url('assets/fonts/ds-digib/ds-digib-webfont.eot?#iefix') format('embedded-opentype'),
  url('assets/fonts/ds-digib/ds-digib-webfont.woff2') format('woff2'),
  url('assets/fonts/ds-digib/ds-digib-webfont.woff') format('woff'),
  url('assets/fonts/ds-digib/ds-digib-webfont.ttf') format('truetype'),
  url('assets/fonts/ds-digib/ds-digib-webfont.svg#ds-digitalbold') format('svg');
  font-weight: normal;
  font-style: normal;
}

// Variables (bs3)
$react-blue: #5ADAFD;
$brand-success: $react-blue;

// Vendor
@import "../node_modules/bootswatch/flatly/variables";
@import "../node_modules/bootstrap-sass/assets/stylesheets/bootstrap";
@import "../node_modules/bootswatch/flatly/bootswatch";

// General
body {
  padding-top: $navbar-height;
}

.container-fluid {
  padding-top: 250px;
  position:relative;
}

```

### Run the project
* ```$ npm start```

## Navigation with React Router

### Creating two views(pages)

#### Introduction view
* Create a new folder named `components` in the src folder
* Create a new folder named `introduction` in the components folder
* In the introduction folder create a new .js file named `Introduction`
```
import React from 'react';
import {PageHeader} from 'react-bootstrap';

class Introduction extends React.Component {
  render() {
    return (
        <div className="container">
          <PageHeader>Set up a frontend in 30 minutes.</PageHeader>
          <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam atque beatae delectus
            dolorem doloribus error ex facilis laboriosam laudantium magni omnis placeat, ratione saepe sapiente sequi
            tempore ullam velit.</p>
        </div>
    );
  }
}

Introduction.propTypes = {};
Introduction.defaultProps = {};

export default Introduction;
```

#### Countdown view
* Create a new folder named `countdown` in the components folder
* In the countdown folder create a new .js file named `Countdown`
```
import React from 'react';

class Countdown extends React.Component {
  render() {
    return (
        <div className="container-fluid">
            <h1>Countdown</h1>
        </div>
    );
  }
}

Countdown.propTypes = {};
Countdown.defaultProps = {};

export default Countdown;
```

### Adding a bootstrap navbar
* Create a new folder named `navigation` in the components folder
* In the countdown folder create a new .js file named `NavbarTop`
```
import React from 'react';
import {Navbar, Nav, NavItem, Glyphicon} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

class NavbarTop extends React.Component {
  render() {
    return (
        <div>
          <Navbar fixedTop default>
            <Navbar.Header>
              <Navbar.Brand>
                <IndexLinkContainer to="/">
                  <a>iDA Fronteers</a>
                </IndexLinkContainer>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <IndexLinkContainer to="/">
                  <NavItem><Glyphicon glyph="flag"/> Introduction</NavItem>
                </IndexLinkContainer>
                <LinkContainer to="/countdown">
                  <NavItem><Glyphicon glyph="time"/> Countdown</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
    );
  }
}

export default NavbarTop;

```

### Configure Routing

#### Template
* Create a .js file named `app-template` in the src folder
```
import React from 'react';
import ReactDOM from 'react-dom';
import NavbarTop from './navigation/NavbarTop'

export default(props) => {
  return (
      <div>
        <NavbarTop/>
        <div className="main">
          {props.children}
        </div>
      </div>
  )
}
```

#### Router
* Create a .js file named `app` in the src folder
```
import React from 'react';
import Introduction from './introduction/Introduction';
import Countdown from './countdown/Countdown';
import Template from './app-template';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

export default () => {
  return (
      <Router history={hashHistory}>
        <Route path="/" component={Template}>
          <IndexRoute component={Introduction}/>
          <Route path="countdown" component={Countdown}/>
        </Route>
      </Router>
  )
}
```

* Remove Hello Fronteers cmp and add the app cmp in index.js file
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

require('./index.scss');

ReactDOM.render(<App />, document.getElementById('app'));

```

### Run the project
* ```$ npm start```

## Counter with Flux architecture

### Counter

#### Styling
* Create a new folder named `counter` in the components folder.
* Create a new .scss file named '_counter' in the counter folder.
```
.counter {
  display:block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width:100%;
  padding: 25px 0;
  font-family:"ds-digitalbold", sans-serif;
  font-size: 20rem;
  line-height: 20rem;
  text-align:center;
  background: linear-gradient(to bottom, rgba(89,106,114,1) 0%,rgba(44,62,80,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */  color:#fff;

  button{
    font-size:10rem;
  }

  @media only screen and (max-width: 767px) {
    padding: 16px 0;
    font-size: 8rem;
    line-height: 8rem;
  }
}
```

#### Javascript
* Create a new .js file named `Counter.js` in the counter folder.
```
import React from 'react';
import TimerActions from "../../actions/TimerActions";
import TimerStore from '../../stores/TimerStore';

require('./_counter.scss');

class Counter extends React.Component {
  _onChange() {
    this.setState({timeOutput: TimerStore.getFormatedTime()});
  };

  constructor(props) {
    super(props);
    this.state = {timeOutput: ""};
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    this.setState({timeOutput: TimerStore.getFormatedTime()});
    TimerStore.addChangeListener(this._onChange);
    let timeProperties = {
      totalTimeInSeconds: (this.props.minutes * 60) + this.props.seconds,
      interval: 1000
    };
    if (!TimerStore.getIsPlaying()) {
      TimerActions.timerStarted(timeProperties, 1000); // 1000 interval
    }
  }

  componentWillUnmount() {
    TimerStore.removeChangeListener(this._onChange);
  };

  render() {
    return (

        <div className="counter">
          {this.state.timeOutput}
        </div>
    );
  };
}

Counter.propTypes = {};
Counter.defaultProps = {};

export default Counter;
```

* Add the counter component in the Countdown.js file.
```
import React from 'react';
import Counter from '../counter/Counter';
import TopicsList from '../topicsList/TopicsList';

class Countdown extends React.Component {
  render() {
    return (
        <div className="container-fluid">
          <Counter minutes={3} seconds={30} milliseconds={0}/>
          <TopicsList />
        </div>
    );
  }
}

Countdown.propTypes = {};
Countdown.defaultProps = {};

export default Countdown;

```

### Counter Flux steps

#### Back to the Counter
* Open Counter.js
* Class created
* State must be created and comes from a store
* A timer Store is needed...

#### Create a TimerStore
* Create a folder named `stores` in the src folder.
* In the stores folder create a new .js file named `TimerStore`
```
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import TimerUtils from '../utils/TimerUtils';
import _ from 'underscore';

const EventEmitter = require('events').EventEmitter;


let TimerStore = _.extend({}, EventEmitter.prototype, {


    _isPlaying: false,
    _interval: 0,
    _timerProperties: {totalTimeInSeconds: 0},
    _elapsedSeconds: 0,


    setIsPlaying() {
        this._isPlaying = true;
    },

    tick() {
        this._timerProperties.totalTimeInSeconds -= 1;
        if (this._timerProperties.totalTimeInSeconds === 0) {
            clearInterval(this._interval);
        }
        else {
            this._elapsedSeconds += 1;
        }
        this.emitChange();
    },


    startTicking(timerProperties) {
        this._timerProperties = timerProperties;
        this._interval = setInterval(this.tick.bind(this), this._timerProperties.interval);
    },


    getIsPlaying() {
        return this._isPlaying;
    },

    getFormatedTime() {
        return TimerUtils.getFormatedTime(this._timerProperties.totalTimeInSeconds);
    },

    getElapsedSeconds() {
        return this._elapsedSeconds;
    },

    getCurrentTimeInSeconds() {
        return this._timerProperties.totalTimeInSeconds;
    },

    // Emit Change event
    emitChange: function () {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function (callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }
});

// Register callback with AppDispatcher
AppDispatcher.register((payload) => {
    let action = payload.action;
    switch (action.actionType) {
        case AppConstants.TIMER_STARTED:
            TimerStore.setIsPlaying();
            TimerStore.startTicking(action.data);
            break;
        default:
            return true;
    }

    TimerStore.emitChange();

    return true;
});

module.exports = TimerStore;

```
* The counter can ask for a formatted time in the TimerStore (getFormatedTime)
* We now must create a timer util that contains this function

#### Create Timer Utils
* Create a new folder named `utils` in the src folder.
* In the utils folder create a new .js file named `TimerUtils`
```
module.exports = {
  getFormatedTime: (seconds) => {
    let sec_num = parseInt(seconds, 10),
        hours = Math.floor(sec_num / 3600),
        minutes = Math.floor((sec_num - (hours * 3600)) / 60),
        sec = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (sec < 10) {
      sec = `0${sec}`;
    }

    let time = `${hours}:${minutes}:${sec}`;

    return time;
  }
};

```

#### Back again to the counter
* Now that we have our TimerStore, and we can ask for a formatted time, our counter can count.
* But the other components must also be aware of the actions of the counter (topics list)
* There for we need to create timer actions

#### Creating Timer Actions and app constants
* Create a new folder named `actions` in the src file
* In the actions folder create a new .js file named `TimerActions`
```
const AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants');

// Define action methods
let TimerActions = {
  timerStarted: (timerProperties) => {
    AppDispatcher.handleAction({
      actionType: AppConstants.TIMER_STARTED,
      data: timerProperties
    });
  }
};

module.exports = TimerActions;

```

* Now the App constants
* Create a new folder named `constants` in the src folder.
* In the constants folder create a new .js file named 'AppConstants'
```
const keyMirror = require('keymirror');

// Define action constants
module.exports = keyMirror({
  TIMER_STARTED: null,
  TOPIC_COMPLETED: null
});

```

* ????????????? zorgt er voor dat discpather gaat dispachten andere componenten ?

##### Create a Dispatcher
* Create a new folder named `dispatcher` in the src folder.
* In the dispatcher folder create a new .js file named 'AppDispatcher'
```
const Dispatcher = require('flux').Dispatcher;

// Create dispatcher instance
let AppDispatcher = new Dispatcher();

// Convenience method to handle dispatch requests
AppDispatcher.handleAction = function (action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = AppDispatcher;

```