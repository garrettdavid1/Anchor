import React from 'react';
import {styles} from './styles';
import {submitStyles} from './styles';
import {ModalBackdrop} from '../../../ModalBackdrop/ModalBackdrop';
// import $ from '../../../../../node_modules/jquery/src/jquery'
import $ from 'jquery';

export class StartingModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userInput: undefined
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    handleUserInput(){
        let val = parseFloat($('#startingBalInput')[0].value);
        if(!isNaN(val)){
            this.setState({
                userInput: val
            });
            this.props.setInitialBalance(val);
        }
    }

    onKeyDown(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            this.handleUserInput();
        }
    }

    
    render(){
        return (
        <div id='startingModal' >
            <div style={styles}>
                <h4>Please enter your current bank account balance.</h4>
                    <input id="startingBalInput" type="number" step=".01" onKeyDown={this.onKeyDown}/>
                    <button type="button" style={submitStyles} onClick={this.handleUserInput}>Submit</button>
            </div>
            <ModalBackdrop />
        </div>
        
        );
    }
}