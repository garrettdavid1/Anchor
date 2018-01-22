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
            balance: parseFloat(this.props.balance),
            dayNum: this.props.dayNum,
            placeholderCount: this.props.placeholderCount,
            transactions: this.props.transactions,
            id: this.props.id,
            endingBal: parseFloat(this.props.endingBal),
            date: this.props.date
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            balance: parseFloat(nextProps.balance),
            dayNum: nextProps.dayNum,
            placeholderCount: nextProps.placeholderCount,
            transactions: nextProps.transactions,
            id: nextProps.id,
            endingBal: parseFloat(nextProps.endingBal),
            date: nextProps.date
        })
    }

    render(){
        let transactions = this.state.transactions.map(transaction => {
            let count = 1;
            return <Transaction key={'transaction-' + count} data={transaction} transId={transaction.id}/>;
            count++;
        });

        let placeholders = [];
        let trans;
        for(var x = 0; x < this.state.placeholderCount; x++){
            trans = <TransactionPlaceholder key={'placeholder-' + (x + 1)}/>;
            placeholders.push(trans);
        }

        return (
            <td style={styles} id={this.state.id}>
                <div style={dayNumStyles}>{this.state.dayNum}</div>
                <table className="transactionContainer" style={transactionContainerStyles}>
                    <tbody>
                        {transactions}
                        {placeholders}
                        <DayButton addOrEditTransaction={this.props.addOrEditTransaction} value={this.state.dayNum} date={this.state.date}/>
                    </tbody>
                </table>
                <div style={amountStyles} ><div className="endingBalance">{this.state.endingBal.toFixed(2)}</div></div>
            </td>
        );
    }
}