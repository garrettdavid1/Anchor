import React from 'react';
import {styles} from './styles';
import {MonthlyBudgetSummary} from './MonthlyBudgetSummary/MonthlyBudgetSummary'
import {MonthContainer} from './MonthContainer/MonthContainer'

export class MonthlyBudget extends React.Component{
    render(){
        return (
        <div style={styles}>
            <MonthContainer date={this.props.date} transactions={this.props.transactions} />
            <MonthlyBudgetSummary transactions={this.props.transactions} />
        </div>
        );
    }
}