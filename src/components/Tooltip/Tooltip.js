import React from 'react';
import {styles} from './styles'

export class Tooltip extends React.Component{

    render(){

        return (
            <div data-toggle="tooltip" title={this.props.text} style={styles}>{this.props.text}</div>
        );
    }
}