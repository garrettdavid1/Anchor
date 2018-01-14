import React from 'react';
import {styles} from './styles';
import {dateStyles} from './styles';
import {dateManipulatorStyles} from './styles';

export class DateSection extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: this.props.date
        }
    }
    
    render(){
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return (
            <div style={styles}>
                <div style={dateStyles}>
                    <div className="glyphicon glyphicon-minus-sign" style={dateManipulatorStyles} onClick={this.props.decrement}></div>&nbsp;
                    {monthNames[this.props.date.getMonth()]}&nbsp;
                    {this.props.date.getFullYear()}&nbsp;
                    <div className="glyphicon glyphicon-plus-sign" style={dateManipulatorStyles} onClick={this.props.increment}></div>
                </div>
            </div>
        );
    }
}