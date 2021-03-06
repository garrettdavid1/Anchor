import React from 'react';
import {styles} from './styles';
import {containerStyles} from './styles';
import {loadingStatusStyles} from './styles';
import {MonthlyBudget} from './MonthlyBudget/MonthlyBudget';
import {TransactionLogs} from './TransactionLogs/TransactionLogs';
import {config} from '../../config';
import {lib} from '../../helpers/lib';
import $ from 'jquery';

export class WidgetSection extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            date: this.props.date,
            data: this.props.initData,
            dataLoaded: undefined,
            loadingStatus: 'Waiting for data...',
            transactionLogCollapsed: false,
            monthlyBudgetCollapsed: false
        }
        this.getData = this.getData.bind(this);
        this.setInitialBalance = this.setInitialBalance.bind(this);
        this.saveTransaction = this.saveTransaction.bind(this);
        this.deleteTransaction = this.deleteTransaction.bind(this);
        this.collapseWidget = this.collapseWidget.bind(this);
        this.uncollapseWidget = this.uncollapseWidget.bind(this);
    }

    componentWillMount() {
        this.setState({
            data: this.props.initData,
            dataLoaded: true
        });
    }

    componentWillReceiveProps(nextProps) {
        this.getData(nextProps.date.getMonth(), nextProps.date.getFullYear());
        this.setState({
            date: nextProps.date,
            data: nextProps.data
        })
    }

    componentDidMount(){
        lib.hideLastMonthButtonIfNotExists(this.props.initData.isFirstAvailableMonth);
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     if(this.state.dataLoaded){
    //         return false;
    //     }
    //     return true;
    // }

    render(){
        let copyOfTrans = [];
        if(lib.exists(this.state.data)){
            copyOfTrans = this.state.data.transactions.slice(0);
        }

        if(copyOfTrans.length === 0){
            copyOfTrans = null;
        }

        if(this.state.dataLoaded){
            const widgets = this.props.widgets.map(widget => {
                switch(widget){
                    case 'monthlyBudget': 
                        return (
                            <div key={widget} className="widget" style={styles}> 
                                <MonthlyBudget 
                                    date={this.state.date} 
                                    transactions={this.state.data.transactions} 
                                    startingBal={this.state.data.startingBal} 
                                    endingBal={this.state.data.endingBal}
                                    totalEarnings={this.state.data.totalEarnings}
                                    totalExpenses={this.state.data.totalExpenses}
                                    monthWasNull={this.state.data.wasNull} 
                                    setInitialBalance={this.setInitialBalance} 
                                    saveTransaction={this.saveTransaction}
                                    deleteTransaction={this.deleteTransaction}
                                    collapseWidget={this.collapseWidget} 
                                    uncollapseWidget={this.uncollapseWidget}
                                    collapsed={this.state.monthlyBudgetCollapsed}/>
                            </div>
                        );
                    case 'transactionLogs':
                        return (
                            <div key={widget} className="widget" style={styles}>
                                <TransactionLogs 
                                    date={this.props.date} 
                                    transactions={copyOfTrans} 
                                    collapseWidget={this.collapseWidget} 
                                    uncollapseWidget={this.uncollapseWidget}
                                    collapsed={this.state.transactionLogCollapsed}/>
                            </div>
                        );
                    default:
                        return <div key={widget}></div>;
                }
            });
    
            return <div id="widgetContainer" style={containerStyles}>{widgets}</div> 
        } else{
            return <div style={loadingStatusStyles}>{this.state.loadingStatus}</div>;
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
            dataLoaded: false,
            loadingStatus: 'Waiting for data...'
        });
        lib.xhrGet(
            config.apiEndpointDomain + '/initStartingBal/' + val + '/' + this.state.date, 
            'json', 
            function(resp){
                self.setState({
                    data: resp,
                    dataLoaded: true
                })
                lib.hideLastMonthButtonIfNotExists(resp.isFirstAvailableMonth);
            }, function(resp){
                self.setState({
                    loadingStatus: 'No data found.'
                })
            }
        );
    }

    getData(monthNum, year) {
        var self = this;
        this.setState({
            dataLoaded: false,
            loadingStatus: 'Waiting for data...'
        })
        lib.xhrGet(
            config.apiEndpointDomain + '/getMonthData/' + monthNum + '/' + year,
            'json',
            function (resp) {
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
            },
            function (resp) {
                self.setState({
                    loadingStatus: 'No data found.'
                })
            }
        );
    }

    saveTransaction(transaction){
        var self = this;
        lib.xhrPost(
            config.apiEndpointDomain + '/saveTransaction',
            'json',
            { transaction: transaction },
            function (resp) {
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
            },
            function (resp) {
                self.setState({
                    loadingStatus: 'No data found.'
                })
            }
        );
    }

    deleteTransaction(date, transId){
        var self = this;
        this.setState({
            dataLoaded: false,
            loadingStatus: 'Waiting for data...'
        })

        lib.xhrGet(
            config.apiEndpointDomain + '/deleteTransaction/' + date + '/' + transId,
            'json',
            function (resp) {
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
            },
            function (resp) {
                self.setState({
                    loadingStatus: 'No data found.'
                });
            }
        );
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

    collapseWidget(e, widgetName, mounting){
        if(this.state[widgetName + 'Collapsed'] === false || mounting){
            this.setState({
                [widgetName + 'Collapsed'] : true
            });
            var widget = $(e.target).parent().parent().parent();
            for(var i = 1; i < widget.children().length; i++){
                $(widget.children()[i]).addClass('hidden');
            }
            $(e.target).siblings().removeClass('hidden');
            $(e.target).addClass('hidden');
        }
    }

    uncollapseWidget(e, widgetName, mounting){
        if(this.state[widgetName + 'Collapsed'] === true || mounting){
            this.setState({
                [widgetName + 'Collapsed'] : false
            });
            var widget = $(e.target).parent().parent().parent();
            for(var i = 1; i < widget.children().length; i++){
                $(widget.children()[i]).removeClass('hidden');
            }
            $(e.target).addClass('hidden');
            $(e.target).siblings().removeClass('hidden');
        }
    }  
}