import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {store} from "./state/store";
import {Provider} from "react-redux";
import {loadAllTickets} from "./state/actions";

store.dispatch(loadAllTickets());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
