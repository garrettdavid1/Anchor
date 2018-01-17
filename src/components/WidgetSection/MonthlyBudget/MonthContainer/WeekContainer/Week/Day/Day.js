import React from 'react';
import {styles} from './styles';
import {dayNumStyles} from './styles';
import {transactionContainerStyles} from './styles';
import {amountStyles} from './styles';
import {Transaction} from './Transaction/Transaction'
import {DayButton} from './DayButton/DayButton';
import {TransactionPlaceholder} from './TransactionPlaceholder/TransactionPlaceholder';

export class Day extends React.Component{
    constructor(props){
        super(props);
        this.state={
            balance: this.props.endingBal
        }
    }

    render(){
        let transactions = this.props.transactions.map(transaction => {
            return <Transaction key={transaction.transId} data={transaction}/>;
        });

        let placeholders = [];
        let trans;
        for(var x = 0; x < this.props.placeholderCount; x++){
            trans = <TransactionPlaceholder key={'placeholder-' + (x + 1)}/>;
            placeholders.push(trans);
        }

        return (
            <td style={styles} id={this.props.id}>
                <div style={dayNumStyles}>{this.props.dayNum}</div>
                <table className="transactionContainer" style={transactionContainerStyles}>
                    <tbody>
                        {transactions}
                        {placeholders}
                        <DayButton />
                    </tbody>
                </table>
                <div style={amountStyles} ><div className="endingBalance">{this.props.endingBal.toFixed(2)}</div></div>
            </td>
        );
    }
}