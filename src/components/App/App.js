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
        <WidgetSection widgets={widgets} date={this.state.date}/>
      </div>
    );
  }
}

export default App;
