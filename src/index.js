import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { compose, createStore } from 'redux'
import rootReducer from './redux/reducers/rootReducer';

import './index.css';
import App from './App';

const store = createStore(rootReducer, compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
