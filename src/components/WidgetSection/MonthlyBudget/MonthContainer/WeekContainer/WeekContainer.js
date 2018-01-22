import React from 'react';
import {tableStyles} from './styles';
import {Week} from './Week/Week';

export class WeekContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            transactions: this.props.transactions,
            date: this.props.date,
            startingBal: this.props.startingBal
        }
        this.getWeeks = this.getWeeks.bind(this);
        this.getEndingBal = this.getEndingBal.bind(this);
    }

    getEndingBal(transactions, startingBal){
        if(transactions.length <= 0){
            return startingBal;
        } else{
            let totalExpenses = 0;
            let expense;
            transactions.forEach(function (trans) {
                totalExpenses += parseFloat(trans.transAmount);
        });
        let endingBal = startingBal + totalExpenses
        return endingBal;
        }
    }

    getWeeks(transData, balance) {
        let transactions = transData;
        let currentTransactionDate = transactions !== undefined ? transactions.length > 0 ? transactions[0].transDate.getDate() : null : null;
        const date = this.state.date;
        let numOfVoidDays = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        let numOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() + numOfVoidDays;
        const numOfWeeks = parseInt((numOfDays / 7) + 1, 10);
        const weekKeys = [];
        let week;
        let numOfDaysToAdd;
        let dayNum = 1;
        let weeklyTransactions = [];
        for (var i = 0; i < numOfWeeks; i++) {
            weekKeys.push(i + 1);
        }
        let weeks = weekKeys.map(weekKey => {
            if (numOfVoidDays > 0) {
                numOfDays -= numOfVoidDays;
                numOfDaysToAdd = 7 - numOfVoidDays;
                if (transactions !== undefined) {
                    for (var j = 0; j < transactions.length; j++) {
                        if (currentTransactionDate >= dayNum && currentTransactionDate <= numOfDaysToAdd) {
                            weeklyTransactions.push(transactions.shift());
                            if (transactions.length > 0) {
                                currentTransactionDate = transactions[0].transDate.getDate();
                            }
                        } else {
                            break;
                        }
                    }
                }
                week = <Week 
                    numOfVoidDays={numOfVoidDays} 
                    daysToAdd={numOfDaysToAdd} 
                    key={'week-' + weekKey} 
                    dayStartNum={dayNum} 
                    transactions={weeklyTransactions} 
                    startingBal={balance} 
                    addOrEditTransaction={this.props.addOrEditTransaction}
                    date={this.state.date}
                    />;
                balance = this.getEndingBal(weeklyTransactions, balance);
                numOfDays -= numOfDaysToAdd
                numOfVoidDays = 0;
                dayNum += numOfDaysToAdd;
                weeklyTransactions = [];
            } else {
                numOfDaysToAdd = numOfDays > 7 ? 7 : numOfDays;
                if (transactions !== undefined) {
                    while (transactions.length > 0) {
                        if (currentTransactionDate >= dayNum && currentTransactionDate < (numOfDaysToAdd + dayNum)) {
                            weeklyTransactions.push(transactions.shift());
                            if (transactions.length > 0) {
                                currentTransactionDate = transactions[0].transDate.getDate();
                            }
                        } else {
                            break;
                        }
                    }
                }
                week = <Week 
                    numOfVoidDays={0} 
                    daysToAdd={numOfDaysToAdd} 
                    key={'week-' + weekKey} 
                    dayStartNum={dayNum} 
                    transactions={weeklyTransactions} 
                    startingBal={balance} 
                    addOrEditTransaction={this.props.addOrEditTransaction}
                    date={this.state.date} 
                    />;
                balance = this.getEndingBal(weeklyTransactions, balance);
                numOfDays -= numOfDaysToAdd;
                dayNum += 7;
                weeklyTransactions = [];
            }
            return week;
        })

        return weeks;
    }

    componentWillMount(){
        this.setState({
            weeks: this.getWeeks(this.props.transactions, this.props.startingBal)
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            transactions: nextProps.transactions,
            date: nextProps.date,
            startingBal: nextProps.startingBal,
            weeks: this.getWeeks(nextProps.transactions, nextProps.startingBal)
        })
    }

    render(){
        
        return (
            <table id="weekContainer" style={tableStyles}>
                <tbody>
                    {this.state.weeks}
                </tbody>
            </table>
        );
    }
}