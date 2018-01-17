import React from 'react';
import {styles} from './styles';
import {iconStyles} from './styles';

export class DayButton extends React.Component{

    render(){
        return (
            <tr className="btn dayButton" style={styles}>
                <td className="glyphicon glyphicon-plus-sign newTransButton" style={iconStyles}></td>
                <td className="glyphicon glyphicon-zoom-in viewDayButton" style={iconStyles}></td>
            </tr>
        );
    }
}