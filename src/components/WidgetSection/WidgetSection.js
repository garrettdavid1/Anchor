import React from 'react';
import {styles} from './styles';
import {containerStyles} from './styles';
import {MonthlyBudget} from './MonthlyBudget/MonthlyBudget'
import {TransactionLogs} from './TransactionLogs/TransactionLogs'
import $ from './../../../node_modules/jquery/src/jquery'

export class WidgetSection extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: this.props.date,
            data: undefined,
            dataLoaded: undefined
        }
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData(this.props.date.getMonth());
    }

    componentWillReceiveProps(nextProps) {
        this.getData(nextProps.date.getMonth());
    }

    render(){
        if(this.state.dataLoaded){
            const widgets = this.props.widgets.map(widget => {
                switch(widget){
                    case 'monthlyBudget': 
                        return (
                            <div key={widget} className="widget" style={styles}> 
                                <MonthlyBudget date={this.props.date} transactions={this.state.data.transactions} startingBal={this.state.data.startingBal} />
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

    getData(monthNum) {
        var self = this;
        $.ajax({
            url: 'http://localhost:1337/getData/' + monthNum,
            type: 'get',
            dataType: 'json'
        }).done(function (resp) {
            resp.transactions.forEach(function (trans) {
                trans.transDate = new Date(trans.transDate);
            });
            self.setState({
                data: resp,
                dataLoaded: true
            })
        }).fail(function (resp) {
            console.log('Response Status: ' + JSON.parse(resp));
        });
    }

    calculateBalances(data){
        let bal = parseFloat(data.startingBal);
        let amount;
        data.transactions.forEach(function(trans){
          amount = trans.transType === 'debit' ? parseFloat(trans.transAmount * -1) : parseFloat(trans.transAmount);
          trans.startingBal = bal;
          bal += amount;
          trans.endingBal = bal;
        });
        return data;
      }
}