import React from 'react';
import {styles} from './styles';
import {submitStyles} from './styles';
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
            date: this.props.date
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
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
            date: nextProps.date
        });
    }
    
    render(){
        return (
            <div id='transactionModal'  >
                <div id="transactionModalContents" style={styles} onKeyDown={this.onKeyDown} tabIndex="0">
                    <div style={headerStyles}>{this.state.dayNum}</div>
                    <div className="closeModal" style={cancelStyles} onClick={this.props.closeTransactionModal}>X</div>
                    <h4>New Transaction</h4>
                    <label style={labelStyles}>Name</label>
                    <input id="transNameInput" style={inputStyles} type="text" />
                    <label style={labelStyles}>Amount</label>
                    <input id="transAmountInput" style={inputStyles} type="number" step=".01" />
                    <button type="button" style={submitStyles} onClick={this.handleUserInput}>Submit</button>
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
        date.setDate(parseInt(this.state.dayNum, 10));
        let transaction = {
            transName: name,
            transAmount: amount,
            transType: type,
            transDate: date
        }
        if(!isNaN(amount) && typeof name === 'string'){
            this.setState({
                userInput: transaction
            });
            this.props.saveTransaction(transaction);
            // this.props.closeTransactionModal();
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
}