import React from 'react';
import { DaysOfTheWeek } from './DaysOfTheWeek/DaysOfTheWeek';
import { WeekContainer } from './WeekContainer/WeekContainer';

export class MonthContainer extends React.Component{

    render(){
        return (
            <div id="monthContainer">
                <DaysOfTheWeek />
                <WeekContainer date={this.props.date} transactions={this.props.transactions} />
            </div>
        );
    }
}