import React from 'react';
import {styles} from './styles';
import {fieldStyles} from './styles';
import {Tooltip} from '../../../../../../../Tooltip/Tooltip'

export class Transaction extends React.Component{
    constructor(props){
        super(props);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.state = {
            amount: this.props.data.transAmount,
            name: this.props.data.transName,
            id: this.props.transId,
            date: this.props.date,
            dayNum: this.props.dayNum
        }
        this.dragStart = this.dragStart.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            amount: nextProps.data.transAmount,
            name: nextProps.data.transName,
            id: nextProps.transId,
            date: nextProps.date,
            dayNum: nextProps.dayNum
        })
    }

    render(){
        return (
            <tr className="transaction" style={styles} onDoubleClick={this.handleDoubleClick} onDragStart={this.dragStart} draggable="true">
                <td className="transactionName" style={fieldStyles}>
                    <Tooltip text={this.state.name} />
                </td>
                <td className="transactionAmount" style={fieldStyles}>{this.state.amount}</td>
            </tr>
        );
    }

    handleDoubleClick(e){
        this.props.openTransactionModal(e, this.state.date, this.state.id, this.state.name, this.state.amount, this.state.dayNum);
        // alert(this.state.amount + ' ' + this.state.name + ' ' + this.state.id);
    }

    dragStart(e){
        let transType = this.state.amount >= 0 ? 'deposit' : 'expense';
        var data = {
            _id: this.state.id,
            transName: this.state.name,
            transAmount: this.state.amount,
            transDate: this.state.date,
            transType: transType
        }
        e.dataTransfer.setData('text', JSON.stringify(data));
    }
}