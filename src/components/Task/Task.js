import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox, FloatingActionButton, TextField, DatePicker} from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/remove';



export default class Task extends React.Component {
    static propTypes = {
        listIndex: PropTypes.number.isRequired,
        taskIndex: PropTypes.number.isRequired,
        text: PropTypes.string,
        duedate: PropTypes.string,
        check: PropTypes.bool.isRequired,
        onCheck: PropTypes.func,
        onRemove: PropTypes.func.isRequired,
        onChangeText: PropTypes.func.isRequired
    };
    
    constructor(props) {
        super(props);
    }


    render () {
        const duedate = new Date();
        duedate.setFullYear(duedate.getFullYear() - 1);
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
                    id = "text-field-default"
                    label = "text"
                    hintText = "Task 내용을 적어주세요"
                    defaultValue = {this.props.text}
                    floatingLabelText = "Task"
                    onChange = {(e) => this.props.onChangeText(this.props.listIndex, this.props.taskIndex, e)}
                />
                <br/>
                <DatePicker
                    autoOk = {true}
                    defaultDate = {duedate}
                />
            </div>
        )
    }
}