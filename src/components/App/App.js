import React, { Component } from 'react';
import './App.css';
import { NavSection } from '../NavSection/NavSection';
import { DateSection } from '../DateSection/DateSection';
import { WidgetSection } from '../WidgetSection/WidgetSection';
import {styles} from './styles';
import {shadowStyles} from './styles'

class App extends Component {
  constructor(props){
    super(props);
    let today = new Date();
    this.state = {
      date: today,
      data: this.getData(today.getMonth())
    };
    this.updateDate = this.updateDate.bind(this);
    this.addMonth = this.addMonth.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  getData(monthNum){
    let data;
    switch (monthNum){
      case 0:
        data = {
          monthName : 'Jan',
          monthNum : 0,
          year : 2018,
          startingBal : 1200.39,
          transactions : [
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
            transName: 'Paycheckblahblahblah',
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
        };
        return this.calculateBalances(data);
      case 1:
        data = {
          monthName : 'Feb',
          monthNum : 1,
          year : 2018,
          startingBal : 1200.39,
          transactions : [
            {
            transId: 0,
            transName: 'Strippers',
            transAmount: '315.90',
            transType: 'debit',
            transDate: new Date('2/4/18')
          },
            {
            transId: 1,
            transName: 'Drugs',
            transAmount: '50.00',
            transType: 'debit',
            transDate: new Date('2/11/18')
          },
            {
            transId: 2,
            transName: 'Alcohol',
            transAmount: '27.39',
            transType: 'debit',
            transDate: new Date('2/13/18')
          },
            {
            transId: 3,
            transName: 'Munchies',
            transAmount: '19.89',
            transType: 'debit',
            transDate: new Date('2/15/18')
          },
          ]
        };
        return this.calculateBalances(data);
      case 2: 
        return 2830;
      default:
        return 200;
    }
  }

  calculateBalances(data){
    let bal = parseFloat(data.startingBal);
    let amount;
    data.transactions.forEach(function(trans){
      amount = trans.transType === 'debit' ? parseFloat(trans.transAmount * -1) : parseFloat(trans.transAmount);
      trans.startingBal = bal;
      bal += amount;
      trans.endingBal = bal;
    });
    return data;
  }

  updateDate(newDate){
    this.setState({
      date: newDate,
    });
  }

  addMonth(num){
    let originalDate = this.state.date;
    let newDate = new Date(originalDate.setMonth(originalDate.getMonth() + num));
    this.setState({
      date: newDate,
      data: this.getData(newDate.getMonth())
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
        <WidgetSection widgets={widgets} date={this.state.date} transactions={this.state.data.transactions} startingBal={this.state.data.startingBal}/>
      </div>
    );
  }
}

export default App;
