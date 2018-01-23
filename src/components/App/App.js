import React, { Component } from 'react';
import './App.css';
import { NavSection } from '../NavSection/NavSection';
import { DateSection } from '../DateSection/DateSection';
import { WidgetSection } from '../WidgetSection/WidgetSection';
import {styles} from './styles';
import {shadowStyles} from './styles';

class App extends Component {
  constructor(props){
    super(props);
    let today = new Date();
    this.state = {
      date: today
    };
    this.addMonth = this.addMonth.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  addMonth(num){
    let originalDate = this.state.date;
    let newDate = new Date(originalDate.setMonth(originalDate.getMonth() + num));
    this.setState({
      date: newDate
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
        <WidgetSection widgets={widgets} date={this.state.date}/>
      </div>
    );
  }
}

export default App;
