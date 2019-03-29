import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import TextField from '@material-ui/core/TextField';

import { getDateToString } from '../../utills/Utill';

export default class Task extends React.PureComponent {
    static propTypes = {
        listIndex: PropTypes.number.isRequired,
        taskIndex: PropTypes.number.isRequired,
        task: PropTypes.object.isRequired,
        onRemove: PropTypes.func.isRequired,
        onChangeText: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired
    };
    
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div
                className = "Task"
            >
                <Checkbox
                    id = "TaskCheckbox"
                    checked = {this.props.task.check}
                    onChange = {() => this.props.onEdit(this.props.task, !this.props.task.check, 'tasks/CHECK', this.props.listIndex, this.props.taskIndex)}
                />
                <TextField
                    id = "TaskTextfield"
                    label = 'Task'
                    placeholder = 'Task 내용을 적어주세요'
                    value = {this.props.task.text}
                    onChange = {(e) => this.props.onChangeText(this.props.listIndex, this.props.taskIndex, e.target.value)}
                    onBlur = {(e) => this.props.onEdit(this.props.task, this.props.task.text, 'tasks/WRITETEXT', this.props.listIndex, this.props.taskIndex, e.target.value)}
                />

                <TextField
                    id="TaskDuedatePicker"
                    label="Due Date"
                    type="date"
                    defaultValue={getDateToString(this.props.task.duedate)}
                    onChange = {(event) => this.props.onEdit(this.props.task, new Date(event.target.value), 'tasks/SELECTDUEDATE', this.props.listIndex, this.props.taskIndex)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <Fab id="TaskDelete" color="primary" aria-label="Delete"
                    onClick = { () => this.props.onRemove(this.props.task.id, this.props.listIndex, this.props.taskIndex)} size='small'
                >
                    <DeleteIcon/>
                </Fab>
            </div>
        )
    }
}