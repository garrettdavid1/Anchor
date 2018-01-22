import React from 'react';
import {styles} from './styles';
import {containerStyles} from './styles';
import {MonthlyBudget} from './MonthlyBudget/MonthlyBudget'
import {TransactionLogs} from './TransactionLogs/TransactionLogs'
import $ from './../../../node_modules/jquery/src/jquery'
import {config} from '../../config'
import {lib} from '../../helpers/lib'

export class WidgetSection extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: this.props.date,
            data: undefined,
            dataLoaded: undefined
        }
        this.getData = this.getData.bind(this);
        this.setInitialBalance = this.setInitialBalance.bind(this);
        this.saveTransaction = this.saveTransaction.bind(this);
    }

    componentWillMount() {
        this.getData(this.props.date.getMonth(), this.props.date.getFullYear());
    }

    componentWillReceiveProps(nextProps) {
        this.getData(nextProps.date.getMonth(), nextProps.date.getFullYear());
    }

    render(){
        if(this.state.dataLoaded){
            const widgets = this.props.widgets.map(widget => {
                switch(widget){
                    case 'monthlyBudget': 
                        return (
                            <div key={widget} className="widget" style={styles}> 
                                <MonthlyBudget date={this.props.date} transactions={this.state.data.transactions} startingBal={this.state.data.startingBal} monthWasNull={this.state.data.wasNull} setInitialBalance={this.setInitialBalance} saveTransaction={this.saveTransaction}/>
                            </div>
                        );
                    case 'transactionLogs':
                        return (
                            <div key={widget} className="widget" style={styles}>
                                <TransactionLogs date={this.props.date} transactions={this.state.data.transactions} />
                            </div>
                        );
                    default:
                        return <div></div>;
                }
            });
    
            return <div id="widgetContainer" style={containerStyles}>{widgets}</div> 
        } else{
            return <div>Waiting for data...</div>;
        }
    }

    saveDataInState(data){
        this.setState({
            dataLoaded: true,
            data: data
        })
    }

    setInitialBalance(val){
        var self = this;
        this.setState({
            dataLoaded: false
        });
        $.ajax({
            url: config.apiEndpointDomain + '/initStartingBal/' + val,
            type: 'get',
            dataType: 'json'
        }).done(function (resp) {
            self.setState({
                data: resp,
                dataLoaded: true
            })
            lib.hideLastMonthButtonIfNotExists(resp.isFirstAvailableMonth);
        }).fail(function (resp) {
            console.log('Response Status: ' + JSON.parse(resp));
        });
    }

    getData(monthNum, year) {
        var self = this;
        $.ajax({
            url: config.apiEndpointDomain + '/getMonthData/' + monthNum + '/' + year,
            type: 'get',
            dataType: 'json'
        }).done(function (resp) {
            resp.startingBal = parseFloat(resp.startingBal);
            resp.transactions.forEach(function (trans) {
                trans.transDate = new Date(trans.transDate);
                trans.transAmount = parseFloat(trans.transAmount);
            });
            self.setState({
                data: resp,
                dataLoaded: true
            });
            lib.hideLastMonthButtonIfNotExists(resp.isFirstAvailableMonth);
        }).fail(function (resp) {
            console.log('Response Status: ' + JSON.parse(resp));
        });
    }

    saveTransaction(transaction){
        var self = this;
        $.ajax({
            url: config.apiEndpointDomain + '/saveTransaction',
            type: 'post',
            data: { transaction: transaction},
            dataType: 'json'
        }).done(function (resp) {
            resp.startingBal = parseFloat(resp.startingBal);
            resp.transactions.forEach(function (trans) {
                trans.transDate = new Date(trans.transDate);
                trans.transAmount = parseFloat(trans.transAmount);
            });
            self.setState({
                data: resp,
                dataLoaded: true
            });
            lib.hideLastMonthButtonIfNotExists(resp.isFirstAvailableMonth);
        }).fail(function (resp) {
            console.log('Response Status: ' + JSON.parse(resp));
        });
    }

    calculateBalances(data){
        let bal = parseFloat(data.startingBal);
        let amount;
        data.transactions.forEach(function(trans){
          amount = parseFloat(trans.transAmount);
          trans.startingBal = bal;
          bal += amount;
          trans.endingBal = bal;
        });
        return data;
      }
}