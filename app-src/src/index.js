import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import * as serviceWorker from 'helpers/serviceWorker';
import reducer from 'reducers';
import App from 'components/appRoute/app/presentational/App';
import '_content/scss/font-awesome.css';
import '_content/scss/main.scss';
import '_content/scss/mobile.scss';
import '_content/scss/dashboard-mobile.scss';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

let middleWare = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middleWare = [...middleWare, logger];
}

const store = createStore(reducer, applyMiddleware(...middleWare));

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <DragDropContextProvider backend={HTML5Backend}>
                <App />
            </DragDropContextProvider>
        </Provider>
    </Router>,
    document.getElementById('root')
);

serviceWorker.unregister();
