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

let messageStyles = {
    color: 'red'
}

export class Login extends React.Component{
    constructor(props){
        super(props);
        this.handleUserLoginInput = this.handleUserLoginInput.bind(this);
        this.handleUserRegisterInput = this.handleUserRegisterInput.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.displayRegister = this.displayRegister.bind(this);
        this.displayLogin = this.displayLogin.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.emailIsValid = this.emailIsValid.bind(this);
        this.state={
            allowAccess: this.props.allowAccess,
            needOrHaveAcct: <div id="needAnAccount" style={needOrHaveAcctStyles} onClick={this.displayRegister}>Don't have an account?</div>,
            confirmPassword: undefined,
            username: undefined,
            submitBtn: <button type="button" className="btn btn-default" style={submitStyles} onClick={this.handleUserLoginInput}>Submit</button>,
            action: 'Login',
            formStyles: loginFormStyles,
            isInitialLoad: true
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
                    <h4>{this.state.action}</h4>
                    <label style={labelStyles} >Email</label>
                    <input id="emailInput" style={inputStyles} type="email" onInput={this.validateEmail}/>
                    {this.state.username}
                    <label style={labelStyles}>Password</label>
                    <input id="passwordInput" style={inputStyles} type="password"/>
                    {this.state.confirmPassword}
                    <div id="loginMessage" className="hidden" style={messageStyles}>{this.state.message}</div>
                    {this.state.needOrHaveAcct}
                    {this.state.submitBtn}
                </div>
            </div>
        );
    }

    handleUserLoginInput(bypassInput){
        var self = this;
        var formData;
        var password;
        var email;
        if(bypassInput === true){
            formData = {};
        } else{
            email = $('#emailInput')[0].value;
            password = $('#passwordInput')[0].value;
            formData = {
                'date': new Date().toString(),
                'email': email,
                'password': password
            }
        }

        if((lib.exists(email) && !lib.isEmpty(email) && lib.exists(password) && !lib.isEmpty(password) && self.emailIsValid(email)) || this.state.isInitialLoad){
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
    
                    if(resp.result === 'failure' && !self.state.isInitialLoad){
                        self.setMessage(resp.message, 'red');
                    } else{
                        self.setState({ isInitialLoad: false });
                    }


                },
                function(resp){ 
                    console.log(resp); 
                    self.setState({ isInitialLoad: false });
                }
            );
        } else if((!lib.exists(email) || lib.isEmpty(email)) || !self.emailIsValid(email)){
            self.setMessage('Please enter a valid email address.', 'red');
        } else if((!lib.exists(password) || lib.isEmpty(password))){
            self.setMessage('Please enter your password.', 'red');
        }
    }

    handleUserRegisterInput(){
        var self = this;
        var email = $('#emailInput')[0].value;
        var username = $('#usernameInput')[0].value;
        var password = $('#passwordInput')[0].value;
        var confirmPassword = $('#confirmPasswordInput')[0].value;
        if(!lib.exists(email) || lib.isEmpty(email) || !self.emailIsValid(email)){
            self.setMessage('Please enter a valid email address.', 'red');
        } else if(!lib.exists(username) || lib.isEmpty(username)){
            self.setMessage('Please enter a valid username.', 'red');
        } else if(!lib.exists(password) || lib.isEmpty(password)){
            self.setMessage('Please enter a valid password.', 'red');
        } else if(!lib.exists(confirmPassword) || lib.isEmpty(confirmPassword)){
            self.setMessage('Please confirm your password.', 'red');
        } else if(password !== confirmPassword){
            self.setMessage('Passwords do not match.', 'red');
        } else{
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

    emailIsValid(e){
        let input;
        if(typeof e === 'string'){
            input = e;
        }else{
            input = e.target.value;
        }
        if(input.indexOf('@') === -1 || input.indexOf('.com') === -1 || input.indexOf('.com') < input.indexOf('@')){
            $('#emailInput').css('border', '1px solid red');
            return false;
        }else{
            $('#emailInput').css('border', '1px solid black');
            return true;
        }
    }

    displayRegister(){
        this.setState({
            needOrHaveAcct: <div id="alreadyHaveAccount" style={needOrHaveAcctStyles} onClick={this.displayLogin}>Already have an account?</div>,
            confirmPassword: 
                <div>
                    <label style={labelStyles}>Confirm Password</label>
                    <input id="confirmPasswordInput" style={inputStyles} type="password" />
                </div>,
            username: 
            <div>
                <label style={labelStyles} >Username</label>
                <input id="usernameInput" style={inputStyles} type="text" />
            </div>,
            submitBtn: <button type="button" className="btn btn-default" style={submitStyles} onClick={this.handleUserRegisterInput}>Submit</button>,
            action: 'Register',
            formStyles: registerFormStyles
        });
    }

    displayLogin(){
        this.setState({
            needOrHaveAcct: <div id="needAnAccount" style={needOrHaveAcctStyles} onClick={this.displayRegister}>Don't have an account?</div>,
            confirmPassword: undefined,
            username: undefined,
            submitBtn: <button type="button" className="btn btn-default" style={submitStyles} onClick={this.handleUserLoginInput}>Submit</button>,
            action: 'Login',
            formStyles: loginFormStyles
        })
    }

    setMessage(message, color){
        if(lib.exists(messageTimer)) clearTimeout(messageTimer);
        this.setState({
            message: message,
            isInitialLoad: false
        })
        messageStyles = { color: color};

        let loginMessage = $('#loginMessage');
        loginMessage.removeClass('hidden');
        let messageTimer = setTimeout(function () {
            loginMessage.addClass('hidden');
        }, 5000);
    }
}