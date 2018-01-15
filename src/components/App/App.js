import React, { Component } from 'react';
import './App.css';
import { NavSection } from '../NavSection/NavSection';
import { DateSection } from '../DateSection/DateSection';
import { WidgetSection } from '../WidgetSection/WidgetSection';
import {styles} from './styles';
import {shadowStyles} from './styles'

const sampleTransactions = [
  {
  transId: 0,
  transName: 'Walmart',
  transAmount: '15.90',
  transType: 'debit',
  transDate: new Date('1/5/18')
},
  {
  transId: 1,
  transName: 'Kroger',
  transAmount: '1.34',
  transType: 'debit',
  transDate: new Date('1/8/18'
)},
  {
  transId: 2,
  transName: 'Paycheck',
  transAmount: '200',
  transType: 'credit',
  transDate: new Date('1/15/18')
},
  {
  transId: 3,
  transName: 'Coyote\'s',
  transAmount: '75.23',
  transType: 'debit',
  transDate: new Date('1/15/18')
},
]

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      date: new Date()
    };
    this.updateDate = this.updateDate.bind(this);
    this.addMonth = this.addMonth.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  updateDate(newDate){
    this.setState({
      date: newDate
    });
  }

  addMonth(num){
    let originalDate = this.state.date;
    this.setState({
      date: new Date(originalDate.setMonth(originalDate.getMonth() + num))
    })
  }

  increment() {
    this.addMonth(1);
  }

  decrement() {
    this.addMonth(-1);
  }

  render() {
    const widgets = ['monthlyBudget', 'transactionLogs'];

    return (
      <div className="App" style={styles}>
        <NavSection />
        <DateSection date={this.state.date} increment={this.increment} decrement={this.decrement}/>
        <div style={shadowStyles}></div>
        <WidgetSection widgets={widgets} date={this.state.date} transactions={sampleTransactions}/>
      </div>
    );
  }
}

export default App;
