import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import {lib} from './helpers/lib'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

window.addEventListener('resize', function(){
    lib.hideTransactionsForSmallScreens();
});

lib.hideTransactionsForSmallScreens();