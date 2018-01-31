import React from 'react';
import {styles} from './styles';
import {formStyles} from './styles';
import {headerStyles} from './styles';
import {inputStyles} from './styles';
import {labelStyles} from './styles';
import {submitStyles} from './styles';
import $ from '../../../node_modules/jquery/src/jquery';
import {config} from '../../config';
import {lib} from '../../helpers/lib';

export class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            allowAccess: this.props.allowAccess
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidMount(){
        $('#emailInput').focus();
    }
    
    render(){
        return (
            <div style={styles} onKeyDown={this.onKeyDown} tabIndex="0">
                <div style={formStyles}>
                <div style={headerStyles}></div>
                    <h4>Login</h4>
                    <label style={labelStyles} >Email</label>
                    <input id="emailInput" style={inputStyles} type="text" defaultValue="garrettdavid1@gmail.com"/>
                    <label style={labelStyles}>Password</label>
                    <input id="passwordInput" style={inputStyles} type="text" defaultValue="Whenever12"/>
                    <button type="button" className="btn btn-default" style={submitStyles} onClick={this.handleUserInput}>Submit</button>
                </div>
            </div>
        );
    }

    handleUserInput(e){
        var self = this;
        var formData = {
            'date': new Date().toString(),
            'email': $('#emailInput')[0].value,
            'password': $('#passwordInput')[0].value
        }

        lib.xhrPost(
            config.apiEndpointDomain + '/login',
            'json',
            formData,
            function(resp){ self.state.allowAccess(resp); },
            function(resp){ console.log(resp); }
        );
    }

    onKeyDown(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            this.handleUserInput();
        }
    }
}