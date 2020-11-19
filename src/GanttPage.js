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
        gantt.config.details_on_create = false;
        gantt.parse(this.state.tasks);
        gantt.render();
    }
    componentDidMount() {
        const options = [
            { val: '1', label: 'Chưa xử lí' },
            { val: '2', label: 'Đang xử lí' },
        ]
        gantt.form_blocks["my_editor"] = {
            render: function (sns) {
                let html = ''
                html += "<div class='dhx_cal_ltext'>"
                html += "<h3 class='titlee'>Thêm mới công việc</h3>"
                html += "<input class='editor_description' type='text' placeholder='TÊN CÔNG VIỆC'>"
                html += "<input class='editor_holders' type='text' placeholder='NGƯỜI GIAO VIỆC'>"
                html += "<input class='editor_holders' type='text' placeholder='ĐỘ ƯU TIÊN'>"
                html += "<input class='editor_holders' type='text' placeholder='ĐỘ KHÓ'>"
                html += "<select id='cars'>"
                html += "<option value='0'>TRẠNG THÁI</option>"
                for (var i = 0; i < options.length; i++) {
                    html += "<option value='" + options[i].key + "'>" + options[i].label + "</option>";
                }
                html += "</select>"
                html += "<input class='editor_holders' type='text' placeholder='HẠN XỬ LÍ'>"
                html += "</div>";
                return html
            },
            set_value: function (node, value, ev, sns) {
                console.log(value)
                node.querySelector(".editor_description").value = value || "";
                node.querySelector(".editor_holders").value = "";
                console.log('=====set_value', ev, sns);
            },
            get_value: function (node, ev) {
                console.log('=====get_value', ev);
                alert('PARENTID: ' + ev.parent + '\nTASK NAME: ' + node.querySelector(".editor_description").value)
                return node.querySelector(".editor_description").value;
            },
            focus: function (node) {
                // console.log('=====focus', node);
                // var a = node.querySelector(".editor_description");
                // a.select();
                // a.focus();
            }
        };
        gantt.config.lightbox.sections = [
            { name: "description", height: 200, map_to: "text", type: "my_editor", focus: true },
            { name: "time", height: 72, type: "duration", map_to: "auto" }
        ];
        gantt.init(this.ganttContainer);
        gantt.parse(this.state.tasks);
        gantt.render();
    }

    render() {
        return (
            <div>
                <div
                    ref={(input) => { this.ganttContainer = input }}
                    style={{ width: '100%', height: '100vh', marginTop: '16px' }}
                ></div>
            </div>
        );
    }
}
