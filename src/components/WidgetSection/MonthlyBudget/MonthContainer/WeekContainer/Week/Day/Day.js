import React from 'react';
import {styles} from './styles';
import {dayNumStyles} from './styles';
import {transactionContainerStyles} from './styles';
import {amountStyles} from './styles';

export class Day extends React.Component{

    render(){
        return (
            <td style={styles} id={this.props.id}>
                <div style={dayNumStyles}>{this.props.dayNum}</div>
                <div className="transactionContainer" style={transactionContainerStyles}></div>
                <div style={amountStyles}></div>
            </td>
        );
    }
}