import React from 'react';
import {Day} from './Day/Day';
import {VoidDay} from './VoidDay/VoidDay';

export class Week extends React.Component{

    render(){
        let num = this.props.dayStartNum;
        let day;
        let transactions = this.props.transactions;
        let currentTransactionDate = transactions.length > 0 ? transactions[0].transDate.getDate() : null;
        const voidDayKeys = [];
        let dailyTransactions = [];
        let highestDailyTransCount = 0;
        let numOfTransForThisDay = 0;
        let numOfPlaceholders = 0;

        //Gets the highest count of days for adding placeholder transactions
        for(var x = num; x <= (num + this.props.daysToAdd); x++){
            transactions.forEach(function(trans){
                if(trans.transDate.getDate() === x){
                    numOfTransForThisDay++;
                }
            });
            highestDailyTransCount = numOfTransForThisDay > highestDailyTransCount ? numOfTransForThisDay : highestDailyTransCount;
            numOfTransForThisDay = 0;
        }

        for(var i = 0; i < this.props.numOfVoidDays; i++){
            voidDayKeys.push('voidDay-' + (i + 1));
        }
        const dayKeys = [];
        for(var j = 0; j < this.props.daysToAdd; j++){
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
            numOfPlaceholders = highestDailyTransCount - dailyTransactions.length;
            day = <Day id={'day-' + dayKey} key={'day-' + dayKey} dayNum={num} transactions={dailyTransactions} placeholderCount={numOfPlaceholders} />;
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

        return (
            <tr className="week">
                {days}
            </tr>
        );
    }
}