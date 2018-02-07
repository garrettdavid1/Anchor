import React from 'react';
import {styles} from './styles';

export class WidgetHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name
        }
    }
    
    render(){

        return (
            <div style={styles}>
                <div style={{display: 'inline-block'}}>{this.props.name}</div>
                <div style={{float: 'right', zIndex: '1'}}>
                    <i id="collapseWidget" className="glyphicon glyphicon-chevron-up" onClick={this.props.collapseWidget}/>
                    <i id="uncollapseWidget" className="glyphicon glyphicon-chevron-down hidden" onClick={this.props.uncollapseWidget} />
                </div>
            </div>
        );
    }
}