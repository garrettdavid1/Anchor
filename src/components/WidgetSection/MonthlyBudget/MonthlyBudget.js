import React from 'react';
import {styles} from './styles';
import {MonthlyBudgetSummary} from './MonthlyBudgetSummary/MonthlyBudgetSummary'
import {MonthContainer} from './MonthContainer/MonthContainer'
import {StartingModal} from './StartingModal/StartingModal'
import {TransactionModal} from './TransactionModal/TransactionModal'
import {lib} from '../../../helpers/lib'

export class MonthlyBudget extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            startingModal: undefined,
            transactionModal: undefined,
            date: this.props.date
        }
        this.setInitialBalance = this.setInitialBalance.bind(this);
        this.openTransactionModal = this.openTransactionModal.bind(this);
        this.closeTransactionModal = this.closeTransactionModal.bind(this);
        this.saveTransaction = this.saveTransaction.bind(this);
    }

    componentWillMount(){
        if(this.props.monthWasNull === true && this.props.date.getMonth() === new Date().getMonth()){
            this.setState({
                startingModal : <StartingModal setInitialBalance={this.setInitialBalance} />
            })
            lib.setFocus('#startingBalInput');
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            date: nextProps.date
        })
    }

    render(){
        return (
        <div style={styles}>
            <MonthContainer date={this.state.date} transactions={this.props.transactions} startingBal={this.props.startingBal} addOrEditTransaction={this.openTransactionModal} />
            <MonthlyBudgetSummary transactions={this.props.transactions} startingBal={this.props.startingBal} />
            {this.state.startingModal}
            {this.state.transactionModal}
        </div>
        );
    }

    setInitialBalance = function(val){
        this.props.setInitialBalance(val);
    }

    openTransactionModal(e, date){
        this.setState({
            transactionModal: 
                <TransactionModal 
                    date={e.target.attributes.date.nodeValue}
                    dayNum={e.target.attributes.value.nodeValue} 
                    closeTransactionModal={this.closeTransactionModal} 
                    saveTransaction={this.saveTransaction}
                />
        })
        lib.setFocus('#transNameInput');
    }

    closeTransactionModal(){
        this.setState({
            transactionModal: undefined
        })
    }

    saveTransaction(transaction){
        this.props.saveTransaction(transaction);
        this.closeTransactionModal();
    }
}