import React from 'react';
import {styles} from './styles';

export class VoidDay extends React.Component{

    render(){
        return (
            <td id={this.props.id} style={styles}></td>
        );
    }
}