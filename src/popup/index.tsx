import React from 'react';
import ReactDOM from 'react-dom';
import App from './Popup';
import '../stylesheets/popup.styl';
import { AppContext } from './state/context';
import { rootStore } from './state/root-store';

ReactDOM.render(
  <AppContext.Provider value={rootStore}>
    <App />
  </AppContext.Provider>,
  document.querySelector('#app'),
);
