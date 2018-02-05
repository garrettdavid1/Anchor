import React from 'react';
import {styles} from './styles';
import {MonthlyBudgetSummaryContent} from './MonthlyBudgetSummaryContent/MonthlyBudgetSummaryContent';

export class MonthlyBudgetSummary extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            transactions: this.props.transactions,
            startingBal: this.props.startingBal,
            endingBal: this.props.endingBal,
            totalEarnings: this.props.totalEarnings,
            totalExpenses: this.props.totalExpenses
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            transactions: nextProps.transactions,
            startingBal: nextProps.startingBal,
            endingBal: nextProps.endingBal,
            totalEarnings: nextProps.totalEarnings,
            totalExpenses: nextProps.totalExpenses
        })
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.transactions !== this.state.transactions || nextProps.startingBal !== this.state.startingBal || nextProps.endingBal !== this.state.endingBal){
            return true;
        }

        return false;
    }

    render(){
        return (
        <div id="monthlySummary" style={styles}>
            <MonthlyBudgetSummaryContent transactions={this.state.transactions} startingBal={this.state.startingBal} endingBal={this.state.endingBal} totalEarnings={this.state.totalEarnings} totalExpenses={this.state.totalExpenses}/>
        </div>
        );
    }
}