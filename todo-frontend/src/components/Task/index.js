import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox, FloatingActionButton, TextField, DatePicker} from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/remove';

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
                className = 'Task'
            >
                index: {this.props.taskIndex}   

                <FloatingActionButton
                    onClick = { () => this.props.onRemove(this.props.task.id, this.props.listIndex, this.props.taskIndex)}
                    mini={true}
                >
                    <ContentRemove/>
                </FloatingActionButton>

                <Checkbox
                    checked = {this.props.task.check}
                    onCheck = {() => this.props.onEdit(this.props.task, !this.props.task.check, 'tasks/CHECK', this.props.listIndex, this.props.taskIndex)}
                />
                <TextField
                    id = 'task textfield'
                    label = 'text'
                    hintText = 'Task 내용을 적어주세요'
                    value = {this.props.task.text}
                    floatingLabelText = 'Task'
                    onChange = {(e) => this.props.onChangeText(this.props.listIndex, this.props.taskIndex, e.target.value)}
                    onBlur = {(e) => this.props.onEdit(this.props.task, this.props.task.text, 'tasks/WRITETEXT', this.props.listIndex, this.props.taskIndex, e.target.value)}
                />
                <br/>
                <DatePicker
                    id = 'duedate picker'
                    autoOk = {true}
                    defaultDate = {this.props.task.duedate}
                    onChange = {(event, date) => this.props.onEdit(this.props.task, date, 'tasks/SELECTDUEDATE', this.props.listIndex, this.props.taskIndex)}
                />
            </div>
        )
    }
}