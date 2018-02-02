import React from 'react';
import {styles} from './styles'
import {optionsStyles} from './styles'
import {optionsIconStyles} from './styles'
import $ from '../../../node_modules/jquery/src/jquery'

export class NavSection extends React.Component{
    constructor(props){
        super(props);
        this.showOptions = this.showOptions.bind(this);
        this.hideOptions = this.hideOptions.bind(this);
    }

    showOptions(){
        $('#options').removeClass('hidden');
    }

    hideOptions(){
        $('#options').addClass('hidden');
    }

    componentDidMount(){
        var self = this;
        window.addEventListener('click', function(e){
            if(!$('#options').hasClass('hidden') && e.target.id !== 'options'){
                self.hideOptions();
            }
        })
    }

    render(){
        return (
        <div style={styles}>
            <i style={optionsIconStyles} className="glyphicon glyphicon-cog" onClick={this.showOptions} />
            <select id="options" style={optionsStyles} className="hidden" defaultValue="Logout">
                <option style={{backgroundColor: 'red', color: 'white', }} value="logout">Logout</option>
            </select>
        </div>
        );
    }

    
}