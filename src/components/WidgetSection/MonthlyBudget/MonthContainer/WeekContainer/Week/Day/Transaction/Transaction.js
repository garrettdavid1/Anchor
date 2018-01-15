import React from 'react';
import {styles} from './styles';
import {fieldStyles} from './styles';

export class Transaction extends React.Component{

    render(){
        let amount = (this.props.data !== undefined) ? this.props.data.transType === 'debit' ? this.props.data.transAmount * -1 : this.props.data.transAmount : '';
        let name = (this.props.data !== undefined) ? this.props.data.transName : '';

        return (
            <tr className="transaction" style={styles}>
                <td className="transactionName" style={fieldStyles}>{name}</td>
                <td className="transactionAmount" style={fieldStyles}>{amount}</td>
            </tr>
        );
    }
}