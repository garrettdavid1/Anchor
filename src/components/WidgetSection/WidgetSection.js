import React from 'react';
import {styles} from './styles';
import {containerStyles} from './styles';
import {MonthlyBudget} from './MonthlyBudget/MonthlyBudget'
import {TransactionLogs} from './TransactionLogs/TransactionLogs'

export class WidgetSection extends React.Component{
    render(){
        const widgets = this.props.widgets.map(widget => {
            switch(widget){
                case 'monthlyBudget': 
                    return (
                        <div key={widget} className="widget" style={styles}> 
                            <MonthlyBudget date={this.props.date} transactions={this.props.transactions} />
                        </div>
                    );
                case 'transactionLogs':
                    return (
                        <div key={widget} className="widget" style={styles}>
                            <TransactionLogs date={this.props.date} transactions={this.props.transactions} />
                        </div>
                    );
                default:
                    return <div></div>;
            }
        });

        return <div id="widgetContainer" style={containerStyles}>{widgets}</div>
        
    }
}