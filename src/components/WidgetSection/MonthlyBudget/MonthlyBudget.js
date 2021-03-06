import React from 'react';
import {styles} from './styles';
import {MonthlyBudgetSummary} from './MonthlyBudgetSummary/MonthlyBudgetSummary';
import {MonthContainer} from './MonthContainer/MonthContainer';
import {StartingModal} from './StartingModal/StartingModal';
import {TransactionModal} from './TransactionModal/TransactionModal';
import {lib} from '../../../helpers/lib';
import {WidgetHeader} from '../WidgetHeader/WidgetHeader';
import $ from 'jquery';

export class MonthlyBudget extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            startingModal: undefined,
            transactionModal: undefined,
            date: this.props.date,
            transactions: this.props.transactions,
            startingBal: this.props.startingBal,
            endingBal: this.props.endingBal,
            totalEarnings: this.props.totalEarnings,
            totalExpenses: this.props.totalExpenses,
            collapsed: this.props.collapsed,
            mounting: true
        }
        this.setInitialBalance = this.setInitialBalance.bind(this);
        this.openTransactionModal = this.openTransactionModal.bind(this);
        this.closeTransactionModal = this.closeTransactionModal.bind(this);
        this.saveTransaction = this.saveTransaction.bind(this);
        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleUncollapse = this.handleUncollapse.bind(this);
    }

    componentWillMount(){
        if(this.props.monthWasNull === true && this.props.date.getMonth() === new Date().getMonth() && this.props.date.getFullYear() === new Date().getFullYear()){
            this.setState({
                startingModal : <StartingModal setInitialBalance={this.setInitialBalance} />
            })
            lib.setFocus('#startingBalInput');
        }
    }

    componentDidMount(){
        if(this.state.collapsed){
            $('#collapse-monthlyBudget').trigger('click');
        } else{
            $('#uncollapse-monthlyBudget').trigger('click');
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps !== undefined){
            this.setState({
                date: nextProps.date,
                transactions: nextProps.transactions,
                startingBal: nextProps.startingBal,
                endingBal: nextProps.endingBal,
                totalEarnings: nextProps.totalEarnings,
                totalExpenses: nextProps.totalExpenses
            })
        }
    }

    render(){
        let copyOfTrans = this.state.transactions.slice(0);

        return (
        <div style={styles}>
            <WidgetHeader name="Monthly Budget" 
                collapseWidget={this.handleCollapse} 
                uncollapseWidget={this.handleUncollapse}
                collapsed={this.state.collapsed}
                widgetName="monthlyBudget"/>
            <MonthContainer 
                date={this.state.date} 
                transactions={this.state.transactions} 
                startingBal={this.state.startingBal}
                endingBal={this.state.endingBal}
                openTransactionModal={this.openTransactionModal} 
                saveTransaction={this.saveTransaction}/>
            <MonthlyBudgetSummary
                transactions={copyOfTrans} 
                startingBal={this.state.startingBal} 
                endingBal={this.state.endingBal} 
                totalEarnings={this.state.totalEarnings} 
                totalExpenses={this.state.totalExpenses}/>
            {this.state.startingModal}
            {this.state.transactionModal}
        </div>
        );
    }

    setInitialBalance = function(val){
        this.props.setInitialBalance(val);
    }

    openTransactionModal(e, date, id, name, amount, dayNum){
        var thisDate = date === undefined ? e.target.attributes.date.nodeValue : date;
        var thisDayNum = dayNum === undefined ? e.target.attributes.value.nodeValue : dayNum;
        this.setState({
            transactionModal: 
                <TransactionModal 
                    date={thisDate}
                    dayNum={thisDayNum} 
                    closeTransactionModal={this.closeTransactionModal} 
                    saveTransaction={this.saveTransaction}
                    id={id}
                    name={name}
                    amount={amount}
                    deleteTransaction={this.props.deleteTransaction}
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

    handleCollapse(e){
        this.props.collapseWidget(e, 'monthlyBudget', this.state.mounting);
        this.setState({
            collapsed: true,
            mounting: false
        });
    }

    handleUncollapse(e){
        this.props.uncollapseWidget(e, 'monthlyBudget', this.state.mounting);
        this.setState({
            collapsed: false,
            mounting: false
        });
    }
}