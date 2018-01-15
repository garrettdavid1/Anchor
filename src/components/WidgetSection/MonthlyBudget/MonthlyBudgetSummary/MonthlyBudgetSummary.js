import React from 'react';
import {styles} from './styles';
import {MonthlyBudgetSummaryContent} from './MonthlyBudgetSummaryContent/MonthlyBudgetSummaryContent';

export class MonthlyBudgetSummary extends React.Component{
    render(){
        return (
        <div style={styles}>
            <MonthlyBudgetSummaryContent transactions={this.props.transactions} />
        </div>
        );
    }
}