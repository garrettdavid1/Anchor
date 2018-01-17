import React from 'react';
import {styles} from './styles';
import {fieldStyles} from './styles';

export class TransactionPlaceholder extends React.Component{

    render(){

        return (
            <tr className="transactionPlaceholder" style={styles}>
                <td style={fieldStyles}>X</td>
            </tr>
        );
    }
}