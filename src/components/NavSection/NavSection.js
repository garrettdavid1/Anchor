import React from 'react';
import {styles} from './styles';
import {dateStyles} from './styles';
import {dateManipulatorStyles} from './styles';
import {optionsStyles} from './styles';
import {logoutStyles} from './styles';
import {indivOptionStyles} from './styles';
import {optionsIconStyles} from './styles';
import $ from 'jquery';
import {lib} from '../../helpers/lib';
import {config} from '../../config';

export class NavSection extends React.Component{
    constructor(props){
        super(props);
        this.showOptions = this.showOptions.bind(this);
        this.hideOptions = this.hideOptions.bind(this);
        this.state = {
            date: this.props.date,
            optionsOpened: false
        }
    }

    componentDidMount(){
        var self = this;
        window.addEventListener('click', function(e){
            if(!$('#options').hasClass('hidden') && e.target.id !== 'options' && e.target.id !== 'optionsIcon' && e.target.classList[0] !== 'option' && self.state.optionsOpened){
                self.hideOptions();
                self.setState({
                    optionsOpened: false
                });
            }
        })
    }
    
    render(){
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return (
            <div id="navSection" style={styles}>
                <div style={dateStyles}>
                    <div id="lastMonth" className="glyphicon glyphicon-minus-sign clickable" style={dateManipulatorStyles} onClick={this.props.decrement}></div>&nbsp;
                    {monthNames[this.props.date.getMonth()]}&nbsp;
                    {this.props.date.getFullYear()}&nbsp;
                    <div id="nextMonth" className="glyphicon glyphicon-plus-sign clickable" style={dateManipulatorStyles} onClick={this.props.increment}></div>
                    <i id="optionsIcon" style={optionsIconStyles} className="glyphicon glyphicon-cog" onClick={this.showOptions} />
                    <table id="options" className="hidden" style={optionsStyles}>
                        <tbody style={{borderRadius: '5px', boxShadow: '2px 2px 2px black'}}>
                            <tr>
                                <td className="option clickable" style={indivOptionStyles}>Account</td>
                            </tr>
                            <tr>
                                <td className="option clickable" style={indivOptionStyles}>Bills</td>
                            </tr>
                            <tr>
                                <td className="option clickable" style={logoutStyles} onClick={this.logout}>Logout</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    showOptions(){
        var self = this;
        $('#options').removeClass('hidden');
        setTimeout(function(){
            self.setState({
                optionsOpened: true
            });
        }, 10)
    }

    hideOptions(){
        var self = this;
        $('#options').addClass('hidden');
        self.setState({
            optionsOpened: false
        });
        this.logout = this.logout.bind(this);
    }

    logout(){
        lib.xhrGet(
            config.apiEndpointDomain + '/logout', 
            'json', 
            function(resp){
                window.location.reload();
            }, function(resp){
            }
        );
    }
}