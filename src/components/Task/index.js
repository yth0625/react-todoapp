import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox, FloatingActionButton, TextField, DatePicker} from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/remove';

export default class Task extends React.PureComponent {
    static propTypes = {
        listIndex: PropTypes.number.isRequired,
        taskIndex: PropTypes.number.isRequired,
        text: PropTypes.string,
        duedate: PropTypes.object,
        check: PropTypes.bool.isRequired,
        onCheck: PropTypes.func,
        onRemove: PropTypes.func.isRequired,
        onChangeText: PropTypes.func.isRequired,
        onChangeDuedate: PropTypes.func.isRequired
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
                    onClick = { () => this.props.onRemove(this.props.listIndex, this.props.taskIndex)}
                    mini={true}
                >
                    <ContentRemove/>
                </FloatingActionButton>

                <Checkbox
                    checked = {this.props.check}
                    onCheck = {() => this.props.onCheck(this.props.listIndex, this.props.taskIndex)}
                />
                <TextField
                    id = "task textfield"
                    label = "text"
                    hintText = "Task 내용을 적어주세요"
                    value = {this.props.text}
                    floatingLabelText = "Task"
                    onChange = {(e) => this.props.onChangeText(this.props.listIndex, this.props.taskIndex, e.target.value)}
                />
                <br/>
                <DatePicker
                    id = "duedate picker"
                    autoOk = {true}
                    defaultDate = {this.props.duedate}
                    onChange = {(event, date) => this.props.onChangeDuedate(this.props.listIndex, this.props.taskIndex, date)}
                />
            </div>
        )
    }
}