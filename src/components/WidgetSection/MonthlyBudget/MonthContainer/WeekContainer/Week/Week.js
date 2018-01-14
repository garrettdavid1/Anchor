import React from 'react';
import {styles} from './styles';
import {Day} from './Day/Day';
import {VoidDay} from './VoidDay/VoidDay';

export class Week extends React.Component{

    render(){
        let num = this.props.dayStartNum;
        let day;
        const voidDayKeys = [];
        for(var i = 0; i < this.props.numOfVoidDays; i++){
            voidDayKeys.push('voidDay-' + (i + 1));
        }
        const dayKeys = [];
        for(var i = 0; i < this.props.daysToAdd; i++){
            dayKeys.push(i + 1);
        }

        const voidDays = voidDayKeys.map(voidDayKey =>{
            return <VoidDay id={voidDayKey} key={voidDayKey} />;
        });
        const realDays = dayKeys.map(dayKey =>{
            day = <Day id={'day-' + dayKey} key={'day-' + dayKey} dayNum={num} />;
            num++;
            return day;
        });

        const days = [];

        voidDays.forEach(function(voidDay){
            days.push(voidDay);
        })

        realDays.forEach(function(realDay){
            days.push(realDay);
        })

        return (
            <tr className="week">
                {days}
            </tr>
        );
    }
}