import React from 'react';
import {styles} from './styles';
import {tableStyles} from './styles';
import {headerRowStyles} from './styles';
import {headerStyles} from './styles';
import {cellStyles} from './styles';
import {WidgetHeader} from '../WidgetHeader/WidgetHeader'

export class TransactionLogs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: this.props.date,
            transactions: this.props.transactions
        }
        this.formatDateTime = this.formatDateTime.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            date: nextProps.date,
            transactions: nextProps.transactions
        })
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.date !== this.state.date || nextProps.transactions !== this.state.transactions){
            return true;
        }

        return false;
    }

    render(){
        this.state.transactions.reverse();
        let transactions = this.state.transactions.map(transaction => {
            let date = this.formatDateTime(transaction.transDate, 'date', false);
            let amount = transaction.transType === 'expense' ? '- $' + Math.abs(transaction.transAmount).toFixed(2) : '+ $' + transaction.transAmount.toFixed(2);
            return  <tr key={'Trans-' + transaction._id}>
                        <td style={cellStyles}>{date}</td>
                        <td style={cellStyles}>{transaction.transName}</td>
                        <td style={cellStyles}>{amount}</td>
                    </tr>
        });

        return (
            <div id="transactionLogsContainer" style={styles}>
                <WidgetHeader name="Transaction Log" />
                <table id="transactionsTable" style={tableStyles}>
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

    formatDateTime(date, returnType, includeSeconds) {
        var dd = date.getDate();
        var MM = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        hh = hh > 0 ? hh : 12;
        var mm = date.getMinutes();
        var ss = date.getSeconds();
        var tt = 'AM';
        ss = (ss < 10) ? '0' + ss : ss;
        mm = (mm < 10) ? '0' + mm : mm;
        if (hh > 12) {
            hh -= 12;
            tt = 'PM';
        } else if(hh === 12){
            tt = 'PM';
        }
    
        var result;
        switch (returnType) {
        case 'time':
            result = (includeSeconds) ? hh + ':' + mm + ':' + ss + ' ' + tt : hh + ':' + mm + ' ' + tt;
            break;
        case 'date':
            result = MM + '/' + dd + '/' + yyyy;
            break;
        default:
            result = (includeSeconds) ?
                MM + '/' + dd + '/' + yyyy + ' ' + hh + ':' + mm + ':' + ss + ' ' + tt :
                MM + '/' + dd + '/' + yyyy + ' ' + hh + ':' + mm + ' ' + tt;
            break;
        }
        
        return result;
    }
}