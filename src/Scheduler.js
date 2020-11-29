import React, { Component } from 'react';
// import { scheduler } from 'dhtmlx-scheduler';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';

const scheduler = window.scheduler;

export default class Scheduler extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: props.tasks
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidUpdate() {
        scheduler.render();
    }
    componentDidMount() {
        scheduler.skin = 'material';
        scheduler.config.details_on_dblclick = false;
        scheduler.config.dblclick_create = false;
        scheduler.config.edit_on_create = false;
        scheduler.config.drag_create = false;
        scheduler.config.drag_move = false;
        scheduler.config.drag_resize = false;
        scheduler.config.header = [
            'day',
            'week',
            'month',
            'date',
            'prev',
            'today',
            'next'
        ];
        scheduler.config.hour_date = '%g:%i %A';
        scheduler.xy.scale_width = 120;

        scheduler.attachEvent("onDblClick", function (id, e) {
            console.log(id, e)
            // scheduler.showLightbox(id);
        })

        // disable option
        // .dhx_cal_select_menu {
        //     display: none !important;
        // }
        scheduler.config.icons_select = [
            // "icon_details",
            // "icon_edit",
            // "icon_delete"
        ];

        scheduler.templates.event_text = function (start, end, ev) {
            let html = '<br>'
            ev.member.map(item => {
                html += item + '<br>'
            })
            console.log(ev.member)
            return html;
        };

        const { events } = this.props;
        scheduler.init(this.schedulerContainer, new Date());
        scheduler.clearAll();
        scheduler.parse(events);
    }

    render() {
        return (
            <div
                ref={(input) => { this.schedulerContainer = input }}
                style={{ width: '100%', height: '100%' }}
            ></div>
        );
    }
}
