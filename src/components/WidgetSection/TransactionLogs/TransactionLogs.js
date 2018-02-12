import React from 'react';
import {styles} from './styles';
import {tableStyles} from './styles';
import {headerRowStyles} from './styles';
import {headerStyles} from './styles';
import {cellStyles} from './styles';
import {noTransCellStyles} from './styles';
import {WidgetHeader} from '../WidgetHeader/WidgetHeader';
import {lib} from '../../../helpers/lib';
import $ from 'jquery';

export class TransactionLogs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: this.props.date,
            transactions: this.props.transactions,
            collapsed: this.props.collapsed,
            mounting: true
        }
        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleUncollapse = this.handleUncollapse.bind(this);
    }

    componentDidMount(){
        if(this.state.collapsed){
            $('#collapse-transactionLog').trigger('click');
        } else{
            $('#uncollapse-transactionLog').trigger('click');
        }
    }

    componentWillReceiveProps(nextProps){
        if(lib.exists(nextProps.transactions)){
            this.setState({
                date: nextProps.date,
                transactions: nextProps.transactions
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(lib.exists(nextProps.transactions)){
            return true;
        }

        return false;
    }

    render(){
        let transactions = [];
        if(lib.exists(this.state.transactions)){
            this.state.transactions.reverse();
            transactions = this.state.transactions.map(transaction => {
            let date = lib.formatDateTime(transaction.transDate, 'date', false);
            let amount = transaction.transType === 'expense' ? '- $' + Math.abs(transaction.transAmount).toFixed(2) : '+ $' + transaction.transAmount.toFixed(2);
            return  <tr key={'Trans-' + transaction._id}>
                        <td style={cellStyles}>{date}</td>
                        <td style={cellStyles}>{transaction.transName}</td>
                        <td style={cellStyles}>{amount}</td>
                    </tr>
        });
        }
        

        if(transactions.length < 1){
            transactions = 
                <tr>
                    <td style={noTransCellStyles} colSpan="3">No Transactions Found.</td>
                </tr>
        }

        return (
            <div id="transactionLogContainer" style={styles}>
                <WidgetHeader name="Transaction Log" 
                    collapseWidget={this.handleCollapse} 
                    uncollapseWidget={this.handleUncollapse} 
                    collapsed={this.state.collapsed}
                    widgetName="transactionLog"/>
                <table id="transactionsTable" style={tableStyles} className="hidden table table-striped">
                    <tbody style={headerRowStyles}>
                        <tr>
                            <th style={headerStyles}>Date</th>
                            <th style={headerStyles}>Name</th>
                            <th style={headerStyles}>Amount</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {transactions}
                    </tbody>
                </table>
            </div>
        );
    }

    handleCollapse(e){
        var self = this;
        this.props.collapseWidget(e, 'transactionLog', this.state.mounting);
        self.setState({
            collapsed: true,
            mounting: false
        });
    }

    handleUncollapse(e){
        var self = this;
        this.props.uncollapseWidget(e, 'transactionLog', this.state.mounting)
        self.setState({
            collapsed: false,
            mounting: false
        });
    }
}