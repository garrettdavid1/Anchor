import React from 'react';
import {styles} from './styles';
import {tableStyles} from './styles';
import {Week} from './Week/Week';

export class WeekContainer extends React.Component{

    render(){
        const date = this.props.date;
        let numOfVoidDays = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        let numOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() + numOfVoidDays;
        const numOfWeeks = parseInt((numOfDays / 7) + 1);
        const weekKeys = [];
        let week;
        let numOfDaysToAdd;
        let dayNum = 1;
        for(var i = 0; i < numOfWeeks; i++){
            weekKeys.push(i + 1);
        }
        const weeks = weekKeys.map(weekKey => {
            if(numOfVoidDays > 0){
                numOfDays -= numOfVoidDays;
                numOfDaysToAdd = 7 - numOfVoidDays;
                week = <Week numOfVoidDays={numOfVoidDays} daysToAdd={numOfDaysToAdd} key={'week-' + weekKey} dayStartNum={dayNum} />;
                numOfDays -= numOfDaysToAdd
                numOfVoidDays = 0;
                dayNum += numOfDaysToAdd;
            }else{
                numOfDaysToAdd = numOfDays > 7 ? 7 : numOfDays;
                week = <Week numOfVoidDays={0} daysToAdd={numOfDaysToAdd} key={'week-' + weekKey} dayStartNum={dayNum} />;
                numOfDays -= numOfDaysToAdd;
                dayNum += 7;
            }
                return week;
            })
        return (
            <table id="weekContainer" className="col-sm-9 col-xs-12" style={tableStyles}>
                <tbody>
                    {weeks}
                </tbody>
            </table>
        );
    }
}