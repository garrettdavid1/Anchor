import React from 'react';
import {tableStyles} from './styles';
import {headerStyles} from './styles';
import {styles} from './styles';

export class DaysOfTheWeek extends React.Component{

    render(){
        const daysOfTheWeek = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat'];
        const days = daysOfTheWeek.map(day => {
            return <th key={day.toString()} style={headerStyles}>{day}</th>;
        })
        return (
        <div className="col-sm-9" style={styles}>
            <table style={tableStyles}>
                <thead>
                    <tr>{days}</tr>
                </thead>
            </table>
        </div>
        );
    }
}