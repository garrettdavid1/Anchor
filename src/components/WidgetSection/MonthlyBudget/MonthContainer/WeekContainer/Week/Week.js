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
            transactions: this.props.transactions
        }
        this.getEndingBal = this.getEndingBal.bind(this);
        this.getDays = this.getDays.bind(this);
    }

    updateBalance(newBalance){
        this.setState({
            balance: newBalance
        })
    }

    getEndingBal(transactions){
        if(transactions.length > 0){
            return transactions[transactions.length - 1].endingBal;
        } else{
            let totalExpenses = 0;
        let expense;
        transactions.forEach(function(trans){
            expense = trans.transType === 'debit' ? parseFloat(trans.transAmount * -1) : parseFloat(trans.transAmount);
            totalExpenses += expense;
        });
        this.updateBalance(this.state.balance - totalExpenses);
        return this.state.balance - totalExpenses;
        }
    }

    getDays(dayStartNum, transactionData, numOfVoidDays, daysToAdd){
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

        //Gets the highest count of days for adding placeholder transactions
        for(var x = num; x <= (num + daysToAdd); x++){
            transactions.forEach(function(trans){
                if(trans.transDate.getDate() === x){
                    numOfTransForThisDay++;
                }
            });
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
            endingBal = this.getEndingBal(dailyTransactions);
            numOfPlaceholders = highestDailyTransCount - dailyTransactions.length;
            day = <Day id={'day-' + dayKey} key={'day-' + dayKey} dayNum={num} transactions={dailyTransactions} placeholderCount={numOfPlaceholders} endingBal={endingBal} />;
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

    componentWillMount(){
        this.setState({
            days : this.getDays(this.state.dayStartNum, this.state.transactions, this.state.numOfVoidDays, this.state.daysToAdd)
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            balance: nextProps.startingBal,
            numOfVoidDays: nextProps.numOfVoidDays,
            daysToAdd: nextProps.daysToAdd,
            dayStartNum: nextProps.dayStartNum,
            transactions: nextProps.transactions,
            days : this.getDays(nextProps.dayStartNum, nextProps.transactions, nextProps.numOfVoidDays, nextProps.daysToAdd)
        });
    }

    render(){
        return (
            <tr className="week">
                {this.state.days}
            </tr>
        );
    }
}