import React from 'react';
import {styles} from './styles';
import {iconStyles} from './styles';

export class TransactionButton extends React.Component{

    render(){
        return (
            <tr className="btn newTransButton" style={styles}><td className="glyphicon glyphicon-plus-sign" style={iconStyles}></td></tr>
        );
    }
}