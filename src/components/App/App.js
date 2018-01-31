import React, { Component } from 'react';
import './App.css';
import { NavSection } from '../NavSection/NavSection';
import { DateSection } from '../DateSection/DateSection';
import { WidgetSection } from '../WidgetSection/WidgetSection';
import {styles} from './styles';
import {shadowStyles} from './styles';
import {Login} from '../Login/Login'

class App extends Component {
  constructor(props){
    super(props);
    let today = new Date();
    today.setDate(1);

    this.allowAccess = this.allowAccess.bind(this);
    this.state = {
      date: today,
      content: <Login allowAccess={this.allowAccess} />,
      user: undefined
    };
    this.addMonth = this.addMonth.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }


  widgets = ['monthlyBudget', 'transactionLogs'];

  addMonth(num){
    let date = this.state.date;
    let newMonthNum = date.getMonth() + num;
    date.setMonth(newMonthNum);
    // let newDate = new Date(originalDate.setMonth(originalDate.getMonth() + num));
    this.setState({
      date: date,
      content: 
        <div>
          <NavSection />
          <DateSection date={this.state.date} increment={this.increment} decrement={this.decrement} />
          <div style={shadowStyles}></div>
          <WidgetSection widgets={this.widgets} date={this.state.date} />
        </div>
    })
  }

  increment() {
    this.addMonth(1);
  }

  decrement() {
    this.addMonth(-1);
  } 

  render() {

    return (
      <div className="App" style={styles}>
        {this.state.content}
      </div>
    );
  }

  allowAccess(data){
    var self = this;

    data.startingBal = parseFloat(data.startingBal);
    data.transactions.forEach(function (trans) {
      trans.transDate = new Date(trans.transDate);
      trans.transAmount = parseFloat(trans.transAmount);
    });

    
    this.setState({
      content: 
        <div>
          <NavSection />
          <DateSection date={this.state.date} increment={this.increment} decrement={this.decrement} />
          <div style={shadowStyles}></div>
          <WidgetSection widgets={this.widgets} date={this.state.date} initData={data} />
        </div>,
      userName: data.userName
    })
  }
}

export default App;
