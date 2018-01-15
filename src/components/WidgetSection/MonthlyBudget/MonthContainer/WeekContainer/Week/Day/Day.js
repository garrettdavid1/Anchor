import React from 'react';
import {styles} from './styles';
import {dayNumStyles} from './styles';
import {transactionContainerStyles} from './styles';
import {amountStyles} from './styles';
import {Transaction} from './Transaction/Transaction'
import {TransactionButton} from './TransactionButton/TransactionButton';

export class Day extends React.Component{

    render(){
        let transactions = this.props.transactions.map(transaction => {
            return <Transaction key={transaction.transId} data={transaction}/>;
        });

        let placeholders = [];
        let trans;
        for(var x = 0; x < this.props.placeholderCount; x++){
            trans = <Transaction key={'placeholder-' + (x + 1)}/>;
            placeholders.push(trans);
        }

        return (
            <td style={styles} id={this.props.id}>
                <div style={dayNumStyles}>{this.props.dayNum}</div>
                <table className="transactionContainer" style={transactionContainerStyles}>
                    <tbody>
                        {transactions}
                        {placeholders}
                        <TransactionButton />
                    </tbody>
                </table>
                <div style={amountStyles}></div>
            </td>
        );
    }
}