import React from 'react';
import {styles} from './styles';
import {iconStyles} from './styles';
import {lib} from '../../../../../../../../helpers/lib'

export class DayButton extends React.Component{
    componentDidMount(){
        lib.hideTransactionsForSmallScreens();
    }

    render(){
        return (
            <tr className="btn dayButton" style={styles}>
                <td className="glyphicon glyphicon-plus-sign newTransButton" style={iconStyles}></td>
                <td className="glyphicon glyphicon-zoom-in viewDayButton" style={iconStyles}></td>
            </tr>
        );
    }
}