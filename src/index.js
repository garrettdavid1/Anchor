import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import $ from '../node_modules/jquery/src/jquery'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

function hideTransactionsForSmallScreens(){
    if(window.innerWidth < 600){
        $('.transaction').hide();
    } else{
        $('.transaction').show();
    }
}

window.addEventListener('resize', function(){
    hideTransactionsForSmallScreens();
});

hideTransactionsForSmallScreens();