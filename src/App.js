import './App.css';
import Gantt from './GanttPage';
import Scheduler from './Scheduler';
import React, { Component } from 'react';
const data = {
    data: [
        {
            id: 4, text: "Project #2", start_date: "01-04-2018",
            duration: 8, progress: 0.4, open: true, user: 'tuan'
        },
        {
            id: 5, text: "Task #1", start_date: "01-04-2018",
            duration: 8, progress: 0.6, parent: 4, user: 'quan'
        },
        {
            id: 6, text: "Task #2", start_date: "11-04-2018",
            duration: 8, progress: 0.6, parent: 4, user: 'kien'
        }
    ],
    links: [
        { id: 1, source: 4, target: 5, type: "1" },
        { id: 2, source: 5, target: 6, type: "0" }
    ]
}

const dataScheduler = [
    { start_date: '2020-11-27 6:00', end_date: '2020-11-27 8:00', text: 'Ca 1', id: 1, member: ['Nguyễn Văn An(03486886)', 'Trần thị Xuyên(09875476)'], color: 'blue' },
    { start_date: '2020-11-23 10:00', end_date: '2020-11-23 18:00', text: 'Ca 2', id: 2, member: ['Phan Binh Tuan(0462463932)', 'Nguyễn Văn Quân(098574368)'], color: 'green' }
];

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: data
        }
    }

    render() {
        return (
            <div className="App" >
                {/* <Gantt
                    tasks={this.state.tasks}
                /> */}
                <div className='scheduler-container' style={{ width: '100%', height: '100vh' }}>
                    <Scheduler events={dataScheduler} />
                </div>
            </div>
        );
    }
}

export default App;
