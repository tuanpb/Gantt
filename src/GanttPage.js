import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

export default class Gantt extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: props.tasks
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tasks: nextProps.tasks
        })
    }

    componentDidUpdate() {
        gantt.parse(this.state.tasks);
        gantt.render();
    }
    componentDidMount() {
        gantt.init(this.ganttContainer);
        gantt.parse(this.state.tasks);
        gantt.render();
    }

    render() {
        return (
            <div
                ref={(input) => { this.ganttContainer = input }}
                style={{ width: '100%', height: '100vh', marginTop: '16px' }}
            ></div>
        );
    }
}
