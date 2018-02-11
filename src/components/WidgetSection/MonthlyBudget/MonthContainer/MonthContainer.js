import React from 'react';
import { DaysOfTheWeek } from './DaysOfTheWeek/DaysOfTheWeek';
import { WeekContainer } from './WeekContainer/WeekContainer';

export class MonthContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: this.props.date,
            transactions: this.props.transactions,
            startingBal: this.props.startingBal,
            endingBal: this.props.endingBal,
            openTransactionModal: this.props.openTransactionModal
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            date: nextProps.date,
            transactions: nextProps.transactions,
            startingBal: nextProps.startingBal,
            endingBal: nextProps.endingBal,
            openTransactionModal: nextProps.openTransactionModal
        })
    }

    shouldComponentUpdate(nextProps, nextState){
        var month = nextProps.date !== undefined ? nextProps.date.getMonth() : null;
        var year = nextProps.date !== undefined ? nextProps.date.getFullYear() : null;
        if (nextProps.transactions === undefined || 
                ((month === this.state.date.getMonth()) && 
                (year === this.state.date.getFullYear()) &&
                (nextProps.startingBal === this.state.startingBal) &&
                (nextProps.endingBal === this.state.endingBal) &&
                (nextProps.transactions === this.state.transactions)
            )) {
            return false;
        }
        return true;
    }

    render(){
        return (
            <div id="monthContainer" className="hidden">
                <DaysOfTheWeek />
                <WeekContainer date={this.props.date} transactions={this.props.transactions} startingBal={this.props.startingBal} openTransactionModal={this.props.openTransactionModal} saveTransaction={this.props.saveTransaction}/>
            </div>
        );
    }
}