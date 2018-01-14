import React from 'react';
import {styles} from './styles';
import {MonthlyBudgetSummaryContent} from './MonthlyBudgetSummaryContent/MonthlyBudgetSummaryContent';

export class MonthlyBudgetSummary extends React.Component{
    render(){
        return (
        <div className="col-sm-3" style={styles}>
            <MonthlyBudgetSummaryContent />
        </div>
        );
    }
}