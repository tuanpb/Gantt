import './App.css';
import Gantt from './GanttPage';
import React, { Component } from 'react';
const data = {
    data: [
        {
            id: 1, text: "Project #2", start_date: "01-04-2018",
            duration: 18, progress: 0.4, open: true
        },
        {
            id: 2, text: "Task #1", start_date: "02-04-2018",
            duration: 8, progress: 0.6, parent: 1
        },
        {
            id: 3, text: "Task #2", start_date: "11-04-2018",
            duration: 8, progress: 0.6, parent: 1
        }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: "1" },
        { id: 2, source: 2, target: 3, type: "0" }
    ]
}

const dataChange = {
    data: [
        {
            id: 1, text: "Project TEST", start_date: "01-04-2018",
            duration: 18, progress: 0.4, open: true
        },
        {
            id: 2, text: "Task #1", start_date: "02-04-2018",
            duration: 8, progress: 0.6, parent: 1
        },
        {
            id: 3, text: "Task #2", start_date: "11-04-2018",
            duration: 8, progress: 0.6, parent: 1
        },
        {
            id: 4, text: "Project TEST2", start_date: "01-04-2018",
            duration: 18, progress: 0.4, open: true
        },
        {
            id: 2, text: "Project TEST3", start_date: "02-04-2018",
            duration: 8, progress: 0.6, open: true
        }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: "1" },
        { id: 2, source: 2, target: 3, type: "0" }
    ]
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: data
        }
    }

    handleChangeData = () => {
        this.setState({
            tasks: dataChange
        })
    }

    render() {
        return (
            <div className="App" >
                <span onClick={this.handleChangeData}>Change Data</span>
                <Gantt
                    tasks={this.state.tasks}
                />
            </div>
        );
    }
}

export default App;
