import React from 'react';
import {styles} from './styles';
import {iconStyles} from './styles';
import {lib} from '../../../../../../../../helpers/lib'

export class DayButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newTransModal: <td className="hidden"></td>,
            dayNum: this.props.dayNum,
            date: this.props.date
        }
        this.openTransactionModal = this.openTransactionModal.bind(this);
    }

    componentDidMount(){
        lib.hideTransactionsForSmallScreens();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dayNum: this.state.dayNum,
            date: this.state.date
        })
    }

    render(){
        return (
            <tr className="btn dayButton" style={styles}>
                <td className="glyphicon glyphicon-plus-sign newTransButton" style={iconStyles} onClick={this.openTransactionModal} value={this.state.dayNum} date={this.state.date}></td>
                <td className="glyphicon glyphicon-zoom-in viewDayButton" style={iconStyles}></td>
                {this.state.newTransModal}
            </tr>
        );
    }

    openTransactionModal(e){
        this.props.openTransactionModal(e, this.state.date, '', '', 0.00, this.state.dayNum);
    }
}