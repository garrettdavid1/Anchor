import React from 'react';
import {styles} from './styles'
import {optionsStyles} from './styles'
import {indivOptionStyles} from './styles'
import {optionsIconStyles} from './styles'
import $ from '../../../node_modules/jquery/src/jquery'
import {lib} from '../../helpers/lib'
import {config} from '../../config'

export class NavSection extends React.Component{
    constructor(props){
        super(props);
        this.showOptions = this.showOptions.bind(this);
        this.hideOptions = this.hideOptions.bind(this);
        this.state = {
            optionsOpened: false
        }
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

    componentDidMount(){
        var self = this;
        window.addEventListener('click', function(e){
            if(!$('#options').hasClass('hidden') && e.target.id !== 'options' && self.state.optionsOpened){
                self.hideOptions();
                self.setState({
                    optionsOpened: false
                });
            }
        })
    }

    render(){
        return (
        <div style={styles}>
            <i style={optionsIconStyles} className="glyphicon glyphicon-cog" onClick={this.showOptions} />
            <div id="options"  className="hidden" style={optionsStyles}>
                <div className="option" style={indivOptionStyles} onClick={this.logout}>Logout</div>
            </div>
        </div>
        );
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