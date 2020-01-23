import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '@material-ui/core'
//import 'bootstrap/dist/css/bootstrap.css';
//import './dark-mode.css'; // comment this out, and take back bootstrap above to get back to default
import './custom.css';
// import './refresh.css';

import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import { createMuiTheme } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

ReactDOM.render(
    <ThemeProvider theme={darkTheme}>
        <App />
    </ThemeProvider>, 
    document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
