import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import $ from 'jquery';

let op = [
    { value: '1', label: 'Chưa xử lí' },
    { value: '2', label: 'Đang xử lí' },
]
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
            { label: 'tuan' },
            { label: 'quan' }
        ]
        gantt.config.columns = [
            { name: "text", label: "Task name", tree: true, width: '*' },
            { name: "start_date", label: "Start time", align: "center" },
            // { name: "duration", label: "Duration", align: "center" },
            { name: "user", label: "Người xử lí", align: "center" },
            // { name: "add", label: "" }
        ];
        gantt.form_blocks["multiselect"] = {
            render: function (sns) {
                var height = (sns.height || "23") + "px";
                var html = "<div class='gantt_cal_ltext gantt_cal_chosen gantt_cal_multiselect'" +
                    "style='height:" + height + ";'><select data-placeholder='...'" +
                    "class='chosen-select' multiple>";
                if (op) {
                    console.log(op)
                    for (var i = 0; i < op.length; i++) {
                        if (sns.unassigned_value !== undefined && op[i].key === sns.unassigned_value) {
                            continue;
                        }
                        html += "<option value='" + op[i].key + "'>" + op[i].label + "</option>";
                    }
                }
                html += "</select></div>";
                return html;
            },

            set_value: function (node, value, ev, sns) {
                node.style.overflow = "visible";
                node.parentNode.style.overflow = "visible";
                node.style.display = "inline-block";
                var select = $(node.firstChild);
                debugger
                if (value) {
                    value = (value + "").split(",");
                    select.val(value);
                }
                else {
                    select.val([]);
                }

                // select.chosen();
                if (sns.onchange) {
                    select.change(function () {
                        sns.onchange.call(this);
                    })
                }
                select.trigger('chosen:updated');
                select.trigger("change");
            },

            get_value: function (node, ev) {
                var value = $(node.firstChild).val();
                //value = value ? value.join(",") : null
                return value;
            },

            focus: function (node) {
                $(node.firstChild).focus();
            }
        };
        gantt.config.lightbox.sections = [
            { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
            {
                name: "owner", height: 60, type: "multiselect", options: gantt.serverList("people"),
                map_to: "owner_id", unassigned_value: 5
            },
            { name: "time", type: "duration", map_to: "auto" }
        ];

        // gantt.config.lightbox.sections = [
        //     { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
        //     { name: "time", height: 72, map_to: "auto", type: "time" }
        // ];
        gantt.attachEvent("onAfterTaskAdd", function (id, item) {
            console.log('ADD ITEM: ', item)
        });
        gantt.attachEvent("onAfterTaskDelete", function (id, item) {
            console.log('DELETE ITEM: ', item)
        });
        gantt.attachEvent("onAfterTaskUpdate", function (id, item) {
            console.log('UPDATE ITEM: ', item)
        });
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
