import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import styles from '../css/style.css';
import { AppContainer } from "react-hot-loader";

const render = (app) => {
    //1
    ReactDOM.render(
        <AppContainer><App/></AppContainer>,
        document.getElementById('root')
    );
};
render(App);


if (module.hot) { // 2
  module.hot.accept("./App.jsx", () => { // 3
    const NextApp = require("./App.jsx").default; // 4
    render(NextApp);
  });
}

/*
1 — we render our root component once more, but we wrap it in an <AppContainer /> 
high order component
If we were to skip the<AppContainer /> hoc the example would at first appear to
work — if we would change the rendered HTML of our components it would update on
the fly. The issue is that each reload would result in the lose of state of each
affected component. Using <AppContainer /> prevents that, as the component will
keep and reapply the state of every child component.

2 — module.hot is an variable made available by webpack and is truthy when the hot reload mode is used.

3 — module.hot.accept — an API function that takes the location of the dependency, which change to monitor;
here we’re going to monitor change to our root component

4 — we’re going to load the component once more, because the one we loaded before
is a cached copy of the old file. We’re not using import statement here, because
all imports must be placed at the top of the file
*/
