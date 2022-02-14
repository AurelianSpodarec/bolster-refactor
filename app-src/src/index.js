import 'config/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducer from 'reducers';
import '_content/scss/font-awesome.css';
import '_content/scss/main.scss';
import '_content/scss/dashboard-mobile.scss';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import AppContainer from 'components/appRoute/app/containers/AppContainer';
import ScrollToTop from 'components/appRoute/app/containers/ScrollToTop';

const middleware = [thunk];
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 10 });

const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));

ReactDOM.render(
    <Router>
        <ScrollToTop>
            <Provider store={store}>
                <DragDropContextProvider backend={HTML5Backend}>
                    <AppContainer />
                </DragDropContextProvider>
            </Provider>
        </ScrollToTop>
    </Router>,
    document.getElementById('root'),
);
