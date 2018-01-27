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
            // date: this.props.date,
            openTransactionModal: this.props.openTransactionModal
        }
        this.drop = this.drop.bind(this);
    }

    componentWillMount(){
        let thisDate = new Date(this.props.date).setDate(this.props.dayNum);
        this.setState({
            date: thisDate
        });
    }

    componentWillReceiveProps(nextProps){
        let thisDate = new Date(this.props.date).setDate(nextProps.dayNum);
        this.setState({
            balance: parseFloat(nextProps.balance),
            dayNum: nextProps.dayNum,
            placeholderCount: nextProps.placeholderCount,
            transactions: nextProps.transactions,
            id: nextProps.id,
            endingBal: parseFloat(nextProps.endingBal),
            date: thisDate
        })
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.transactions === this.state.transactions){
            return false;
        }
        return true;
    }

    render(){
        var self = this;
        // let date = new Date(this.state.date);
        // this.setState({date: date.setDate(this.state.dayNum)});
        let transactions = this.state.transactions.map(transaction => {
            return <Transaction 
                key={'transaction-' + transaction._id} 
                data={transaction} 
                transId={transaction._id} 
                openTransactionModal={self.props.openTransactionModal}
                date={self.state.date}
                dayNum={this.state.dayNum}
                />;
        });

        let placeholders = [];
        let trans;
        for(var x = 0; x < this.state.placeholderCount; x++){
            trans = <TransactionPlaceholder key={'placeholder-' + (x + 1)}/>;
            placeholders.push(trans);
        }

        return (
            <td style={styles} id={this.state.id} onDrop={this.drop} onDragOver={this.preventDefault}>
                <div style={dayNumStyles}>{this.state.dayNum}</div>
                <table className="transactionContainer" style={transactionContainerStyles}>
                    <tbody>
                        {transactions}
                        {placeholders}
                        <DayButton openTransactionModal={this.props.openTransactionModal} dayNum={this.state.dayNum} date={this.state.date}/>
                    </tbody>
                </table>
                <div style={amountStyles} ><div className="endingBalance">{this.state.endingBal.toFixed(2)}</div></div>
            </td>
        );
    }

    drop(e){
        e.preventDefault();
        var data;

        try{
            data = JSON.parse(e.dataTransfer.getData('text'));
        }catch (e){
            return;
        }
        data.transDate = new Date(this.state.date);
        this.props.saveTransaction(data);
    }

    preventDefault(e){
        e.preventDefault();
    }
}