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
        $('.transactionPlaceholder').hide();
        $('.endingBalance').hide();
        $('.newTransButton').hide();
        $('.viewDayButton').show();
    } else{
        $('.transaction').show();
        $('.transactionPlaceholder').show();
        $('.endingBalance').show();
        $('.newTransButton').show();
        $('.viewDayButton').hide();
    }
}

window.addEventListener('resize', function(){
    hideTransactionsForSmallScreens();
});

hideTransactionsForSmallScreens();