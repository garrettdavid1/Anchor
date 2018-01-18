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
            balance: this.props.endingBal,
            dayNum: this.props.dayNum,
            placeholderCount: this.props.placeholderCount,
            transactions: this.props.transactions,
            id: this.props.id,
            endingBal: this.props.endingBal
        }
    }

    componentWillMount(){
        this.setState({
            balance: this.props.balance,
            dayNum: this.props.dayNum,
            placeholderCount: this.props.placeholderCount,
            transactions: this.props.transactions,
            id: this.props.id,
            endingBal: this.props.endingBal
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            balance: nextProps.balance,
            dayNum: nextProps.dayNum,
            placeholderCount: nextProps.placeholderCount,
            transactions: nextProps.transactions,
            id: nextProps.id,
            endingBal: nextProps.endingBal
        })
    }

    render(){
        let transactions = this.state.transactions.map(transaction => {
            return <Transaction key={transaction.transId} data={transaction}/>;
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
                        <DayButton />
                    </tbody>
                </table>
                <div style={amountStyles} ><div className="endingBalance">{this.state.endingBal.toFixed(2)}</div></div>
            </td>
        );
    }
}