import React from 'react';
import {styles} from './styles';
import {loginFormStyles} from './styles';
import {registerFormStyles} from './styles';
import {headerStyles} from './styles';
import {inputStyles} from './styles';
import {labelStyles} from './styles';
import {submitStyles} from './styles';
import {needOrHaveAcctStyles} from './styles';
import $ from '../../../node_modules/jquery/src/jquery';
import {config} from '../../config';
import {lib} from '../../helpers/lib';

export class Login extends React.Component{
    constructor(props){
        super(props);
        this.handleUserLoginInput = this.handleUserLoginInput.bind(this);
        this.handleUserRegisterInput = this.handleUserRegisterInput.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.displayRegister = this.displayRegister.bind(this);
        this.displayLogin = this.displayLogin.bind(this);
        this.state={
            allowAccess: this.props.allowAccess,
            needOrHaveAcct: <div id="needAnAccount" style={needOrHaveAcctStyles} onClick={this.displayRegister}>Don't have an account?</div>,
            confirmPassword: undefined,
            username: undefined,
            submitBtn: <button type="button" className="btn btn-default" style={submitStyles} onClick={this.handleUserLoginInput}>Submit</button>,
            action: <h4>Login</h4>,
            formStyles: loginFormStyles
        }
    }

    componentWillMount(){
        this.handleUserLoginInput(true);
    }

    componentDidMount(){
        $('#emailInput').focus();
    }
    
    render(){
        return (
            <div id="loginForm" style={styles} onKeyDown={this.onKeyDown} tabIndex="0" className="hidden">
                <div style={this.state.formStyles}>
                    <div style={headerStyles}></div>
                    {this.state.action}
                    <label style={labelStyles} >Email</label>
                    <input id="emailInput" style={inputStyles} type="text"/>
                    {this.state.username}
                    <label style={labelStyles}>Password</label>
                    <input id="passwordInput" style={inputStyles} type="text"/>
                    {this.state.confirmPassword}
                    {this.state.needOrHaveAcct}
                    {this.state.submitBtn}
                </div>
            </div>
        );
    }

    handleUserLoginInput(bypassInput){
        var self = this;
        var formData;
        if(bypassInput === true){
            formData = {};
        } else{
            formData = {
                'date': new Date().toString(),
                'email': $('#emailInput')[0].value,
                'password': $('#passwordInput')[0].value
            }
        }

        lib.xhrPost(
            config.apiEndpointDomain + '/login',
            'json',
            formData,
            function(resp){ 
                if(lib.exists(resp.transactions)){
                    self.state.allowAccess(resp);
                } else{
                    $('#loginForm').removeClass('hidden');
                }
            },
            function(resp){ console.log(resp); }
        );
    }

    handleUserRegisterInput(){
        var self = this;
        var email = $('#emailInput')[0].value;
        var username = $('#usernameInput')[0].value;
        var password = $('#passwordInput')[0].value;
        var confirmPassword = $('#confirmPasswordInput')[0].value;
        if(password !== confirmPassword){
            //Set error saying passwords don't match.
        } else if(lib.exists(email) && !lib.isEmpty(email) &&
            lib.exists(username) && !lib.isEmpty(username) &&
            lib.exists(password) && !lib.isEmpty(password) &&
            lib.exists(confirmPassword) && !lib.isEmpty(confirmPassword)){
                var formData = {
                    userName: username,
                    password: password,
                    email: email
                }
                lib.xhrPost(
                    config.apiEndpointDomain + '/register',
                    'json',
                    formData,
                    function(resp){ 
                        if(resp.result === 'success'){
                            self.displayLogin();
                        }
                    },
                    function(resp){ console.log(resp); }
                );
            }
    }

    onKeyDown(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            if(this.state.action === 'Login'){
                this.handleUserLoginInput(false);
            } else{
                this.handleUserRegisterInput();
            }
        }
    }

    displayRegister(){
        this.setState({
            needOrHaveAcct: <div id="alreadyHaveAccount" style={needOrHaveAcctStyles} onClick={this.displayLogin}>Already have an account?</div>,
            confirmPassword: 
                <div>
                    <label style={labelStyles}>Confirm Password</label>
                    <input id="confirmPasswordInput" style={inputStyles} type="text" />
                </div>,
            username: 
            <div>
                <label style={labelStyles} >Username</label>
                <input id="usernameInput" style={inputStyles} type="text" />
            </div>,
            submitBtn: <button type="button" className="btn btn-default" style={submitStyles} onClick={this.handleUserRegisterInput}>Submit</button>,
            action: <h4>Register</h4>,
            formStyles: registerFormStyles
        });
    }

    displayLogin(){
        this.setState({
            needOrHaveAcct: <div id="needAnAccount" style={needOrHaveAcctStyles} onClick={this.displayRegister}>Don't have an account?</div>,
            confirmPassword: undefined,
            username: undefined,
            submitBtn: <button type="button" className="btn btn-default" style={submitStyles} onClick={this.handleUserLoginInput}>Submit</button>,
            action: <h4>Login</h4>,
            formStyles: loginFormStyles
        })
    }
}