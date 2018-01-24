import React from 'react';
import {styles} from './styles';
import {submitStyles} from './styles';
import {deleteStyles} from './styles';
import {fullWidthBtnStyles} from './styles';
import {headerStyles} from './styles';
import {labelStyles} from './styles';
import {inputStyles} from './styles';
import {cancelStyles} from './styles';
import {ModalBackdrop} from '../../../ModalBackdrop/ModalBackdrop';
import $ from '../../../../../node_modules/jquery/src/jquery'

export class TransactionModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userInput: undefined,
            date: this.props.date,
            name: this.props.name,
            amount: this.props.amount,
            dayNum: this.props.dayNum,
            id: this.props.id
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.updateNameState = this.updateNameState.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount(){
        this.setState({
            dayNum: this.props.dayNum,
            date: this.props.date
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dayNum: nextProps.dayNum,
            date: nextProps.date,
            name: nextProps.name,
            amount: nextProps.amount,
            id: nextProps.id
        });
    }
    
    render(){
        let action = (this.state.id !== undefined && this.state.id !== '') ? 'Edit' : 'New';
        let deleteBtn = action === 'Edit' ? <button type="button" className="btn btn-danger" style={deleteStyles} onClick={this.handleDelete}>Delete</button> : '';
        let submitBtnStyles = action === 'Edit' ? submitStyles : fullWidthBtnStyles;
        return (
            <div id='transactionModal'  >
                <div id="transactionModalContents" style={styles} onKeyDown={this.onKeyDown} tabIndex="0">
                    <div style={headerStyles}>{this.state.dayNum}</div>
                    <div className="closeModal" style={cancelStyles} onClick={this.props.closeTransactionModal}>X</div>
                    <h4>{action} Transaction</h4>
                    <label style={labelStyles}>Name</label>
                    <input id="transNameInput" style={inputStyles} type="text" defaultValue={this.state.name} onChange={this.updateNameState} />
                    <label style={labelStyles}>Amount</label>
                    <input id="transAmountInput" style={inputStyles} type="number" step=".01" defaultValue={this.state.amount} onChange={this.updateAmountState} />
                    <button type="button" className="btn btn-default" style={submitBtnStyles} onClick={this.handleUserInput}>Submit</button>
                    {deleteBtn}
                </div>
                <ModalBackdrop />
            </div>
        );
    }

    handleUserInput(){
        let name = $('#transNameInput')[0].value;
        let amount = parseFloat($('#transAmountInput')[0].value)
        let type = amount >= 0 ? 'deposit' : 'expense';
        let date = new Date(this.state.date);
        let id = this.state.id;
        date.setDate(parseInt(this.state.dayNum, 10));
        let transaction = {
            transName: name,
            transAmount: amount,
            transType: type,
            transDate: date,
            _id: id
        }
        if(!isNaN(amount) && typeof name === 'string'){
            this.setState({
                userInput: transaction
            });
            this.props.saveTransaction(transaction);
        }
    }

    handleDelete(){
        var confirm = window.confirm('Are you sure you want to delete this transaction?');
        if(confirm){
            this.props.deleteTransaction(this.state.date, this.state.id);
        }
    }

    onKeyDown(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            this.handleUserInput();
        } else if(e.key === 'Escape'){
            this.props.closeTransactionModal();
        }
    }

    updateNameState(e){
        // this.setState({
        //     name: e.target.attributes.value.nodeValue
        // });
    }
    updateAmountState(e){
        // this.setState({
        //     amount: parseFloat(e.target.attributes.value.nodeValue)
        // });
    }
}