import React from 'react';
import {tableStyles} from './styles';
import {Week} from './Week/Week';

export class WeekContainer extends React.Component{

    render(){
        let transactions = this.props.transactions;
        let currentTransactionDate = transactions.length > 0 ? transactions[0].transDate.getDate() : null;
        const date = this.props.date;
        let numOfVoidDays = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        let numOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() + numOfVoidDays;
        const numOfWeeks = parseInt((numOfDays / 7) + 1, 10);
        const weekKeys = [];
        let week;
        let numOfDaysToAdd;
        let dayNum = 1;
        let weeklyTransactions = [];
        for(var i = 0; i < numOfWeeks; i++){
            weekKeys.push(i + 1);
        }
        const weeks = weekKeys.map(weekKey => {
            if(numOfVoidDays > 0){
                numOfDays -= numOfVoidDays;
                numOfDaysToAdd = 7 - numOfVoidDays;
                for(var j = 0; j < transactions.length; j++){
                    if(currentTransactionDate >= dayNum && currentTransactionDate <= numOfDaysToAdd){
                        weeklyTransactions.push(transactions.shift());
                        if(transactions.length > 0){
                            currentTransactionDate = transactions[0].transDate.getDate();
                        }
                    } else{
                        break;
                    }
                }
                week = <Week numOfVoidDays={numOfVoidDays} daysToAdd={numOfDaysToAdd} key={'week-' + weekKey} dayStartNum={dayNum} transactions={weeklyTransactions} />;
                numOfDays -= numOfDaysToAdd
                numOfVoidDays = 0;
                dayNum += numOfDaysToAdd;
                weeklyTransactions = [];
            }else{
                numOfDaysToAdd = numOfDays > 7 ? 7 : numOfDays;
                while(transactions.length > 0){
                    if(currentTransactionDate >= dayNum && currentTransactionDate <= (numOfDaysToAdd + dayNum)){
                        weeklyTransactions.push(transactions.shift());
                        if(transactions.length > 0){
                            currentTransactionDate = transactions[0].transDate.getDate();
                        }
                    } else{
                        break;
                    }
                }
                week = <Week numOfVoidDays={0} daysToAdd={numOfDaysToAdd} key={'week-' + weekKey} dayStartNum={dayNum} transactions={weeklyTransactions}/>;
                numOfDays -= numOfDaysToAdd;
                dayNum += 7;
                weeklyTransactions = [];
            }
                return week;
            })
        return (
            <table id="weekContainer" style={tableStyles}>
                <tbody>
                    {weeks}
                </tbody>
            </table>
        );
    }
}