import React from 'react';
import {styles} from './styles';
import { DaysOfTheWeek } from './DaysOfTheWeek/DaysOfTheWeek';
import { WeekContainer } from './WeekContainer/WeekContainer';

export class MonthContainer extends React.Component{

    render(){
        return (
            <div id="monthContainer">
                <DaysOfTheWeek />
                <WeekContainer date={this.props.date} />
            </div>
        );
    }
}