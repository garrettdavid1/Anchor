import React from 'react';
import {Day} from './Day/Day';
import {VoidDay} from './VoidDay/VoidDay';

export class Week extends React.Component{
    constructor(props){
        super(props);
        this.state={
            balance: this.props.startingBal,
            numOfVoidDays: this.props.numOfVoidDays,
            daysToAdd: this.props.daysToAdd,
            dayStartNum: this.props.dayStartNum,
            transactions: this.props.transactions,
            date: this.props.date
            // days: this.getDays(this.props.dayStartNum, this.props.transactions, this.props.numOfVoidDays, this.props.daysToAdd, this.props.balance)
        }
        this.getEndingBal = this.getEndingBal.bind(this);
        this.getDays = this.getDays.bind(this);
        this.updateBalance = this.updateBalance.bind(this);
    }

    componentWillMount(){
        this.setState({
            days : this.getDays(this.state.dayStartNum, this.state.transactions, this.state.numOfVoidDays, this.state.daysToAdd, parseFloat(this.state.balance))
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            balance: nextProps.startingBal,
            numOfVoidDays: nextProps.numOfVoidDays,
            daysToAdd: nextProps.daysToAdd,
            dayStartNum: nextProps.dayStartNum,
            transactions: nextProps.transactions,
            days : this.getDays(nextProps.dayStartNum, nextProps.transactions, nextProps.numOfVoidDays, nextProps.daysToAdd, parseFloat(nextProps.startingBal)),
            date: nextProps.date
        });
    }

    render(){
        return (
            <tr className="week">
                {this.state.days}
            </tr>
        );
    }

    updateBalance(newBalance){
        this.setState({
            balance: newBalance
        })
    }

    getEndingBal(transactions, startingBal){
        if(transactions.length <= 0){
            return startingBal;
        } else{
            let totalExpenses = 0;
            transactions.forEach(function (trans) {
                totalExpenses += parseFloat(trans.transAmount);
        });
        let endingBal = startingBal + totalExpenses
        this.updateBalance(endingBal);
        return endingBal;
        }
    }

    getDays(dayStartNum, transactionData, numOfVoidDays, daysToAdd, balance){
        let num = dayStartNum;
        let day;
        let transactions = transactionData;
        let currentTransactionDate = transactions.length > 0 ? transactions[0].transDate.getDate() : null;
        const voidDayKeys = [];
        let dailyTransactions = [];
        let highestDailyTransCount = 0;
        let numOfTransForThisDay = 0;
        let numOfPlaceholders = 0;
        let endingBal = 0;

        function countTransactionsPerDay(x){
            transactions.forEach(function(trans){
                if(trans.transDate.getDate() === x){
                    numOfTransForThisDay++;
                }
            });
        }
        //Gets the highest count of days for adding placeholder transactions
        for(var x = num; x <= (num + daysToAdd); x++){
            countTransactionsPerDay(x);
            highestDailyTransCount = numOfTransForThisDay > highestDailyTransCount ? numOfTransForThisDay : highestDailyTransCount;
            numOfTransForThisDay = 0;
        }

        for(var i = 0; i < numOfVoidDays; i++){
            voidDayKeys.push('voidDay-' + (i + 1));
        }
        const dayKeys = [];
        for(var j = 0; j < daysToAdd; j++){
            dayKeys.push(j + 1);
        }

        const voidDays = voidDayKeys.map(voidDayKey =>{
            return <VoidDay id={voidDayKey} key={voidDayKey} />;
        });

        const realDays = dayKeys.map(dayKey =>{
            while(transactions.length > 0){
                if(currentTransactionDate === num){
                    dailyTransactions.push(transactions.shift());
                    if(transactions.length > 0){
                        currentTransactionDate = transactions[0].transDate.getDate();
                    }
                } else{
                    break;
                }
            }
            endingBal = this.getEndingBal(dailyTransactions, balance);
            numOfPlaceholders = highestDailyTransCount - dailyTransactions.length;
            day = <Day 
                id={'day-' + dayKey} 
                key={'day-' + dayKey} 
                dayNum={num} 
                transactions={dailyTransactions} 
                placeholderCount={numOfPlaceholders} 
                endingBal={endingBal} 
                openTransactionModal={this.props.openTransactionModal}
                date={this.state.date}
                saveTransaction={this.props.saveTransaction}
                />;
            balance = endingBal;
            num++;
            dailyTransactions = [];
            return day;
        });

        const days = [];

        voidDays.forEach(function(voidDay){
            days.push(voidDay);
        })

        realDays.forEach(function(realDay){
            days.push(realDay);
        })

        return days;
    }
}