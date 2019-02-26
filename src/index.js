import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,HashRouter} from 'react-router-dom';
import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import 'whatwg-fetch';
// import 'babel-polyfill';
import {Provider} from 'react-redux';
import rootSaga from './saga';
import CreateStore from './store';
const store=CreateStore();
store.runSaga(rootSaga);





ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
