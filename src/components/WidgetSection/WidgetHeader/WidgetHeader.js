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
            <div style={styles}>{this.props.name}</div>
        );
    }
}