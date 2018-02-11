import React from 'react';
import {styles} from './styles';

export class WidgetHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            collapsed: this.props.collapsed,
            widgetName: this.props.widgetName
        }
    }
    
    render(){
        let content;
        if(this.state.collapsed){
            content = (
                <div style={styles}>
                    <div style={{display: 'inline-block'}}>{this.props.name}</div>
                    <div style={{float: 'right', zIndex: '1'}}>
                        <i id={'collapse-' + this.state.widgetName} className="collapseWidget glyphicon glyphicon-chevron-up hidden clickable" onClick={this.props.collapseWidget}/>
                        <i id={'uncollapse-' + this.state.widgetName} className="uncollapseWidget glyphicon glyphicon-chevron-down clickable" onClick={this.props.uncollapseWidget} />
                    </div>
                </div>
            );
        } else{
            content = (
                <div style={styles}>
                    <div style={{display: 'inline-block'}}>{this.props.name}</div>
                    <div style={{float: 'right', zIndex: '1'}}>
                        <i id={'collapse-' + this.state.widgetName} className="collapseWidget glyphicon glyphicon-chevron-up clickable" onClick={this.props.collapseWidget}/>
                        <i id={'uncollapse-' + this.state.widgetName} className="uncollapseWidget glyphicon glyphicon-chevron-down hidden clickable" onClick={this.props.uncollapseWidget} />
                    </div>
                </div>
            );
        }
        return content;
    }
}