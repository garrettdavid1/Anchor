import React from 'react';
import {styles} from './styles';
import {sectionStyles} from './styles';
import {metricStyles} from './styles';
import {headingStyles} from './styles';
import {columnStyles} from './styles';

export class MonthlyBudgetSummaryContent extends React.Component{
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
            <div id="monthlySummaryContent" style={styles}>
                <div className="summarySectionCol" style={columnStyles}>
                    <div style={sectionStyles}>
                        <div style={headingStyles}>Starting Balance:</div>
                        <div style={metricStyles}>${this.state.startingBal.toFixed(2)}</div>
                    </div>
                    <div style={sectionStyles}>
                        <div style={headingStyles}>Ending Balance:</div>
                        <div style={metricStyles}>${this.state.endingBal.toFixed(2)}</div>
                    </div>
                </div>
                <div className="summarySectionCol" style={columnStyles}>
                    <div style={sectionStyles}>
                        <div style={headingStyles}>Total Earnings:</div>
                        <div style={metricStyles}>${this.state.totalEarnings.toFixed(2)}</div>
                    </div>
                    <div style={sectionStyles}>
                        <div style={headingStyles}>Total Expenses:</div>
                        <div style={metricStyles}>${this.state.totalExpenses.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        )
    }
}