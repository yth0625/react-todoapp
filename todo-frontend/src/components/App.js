import React from 'react';

import TaskListContainer from '../containers/TaskListContainer';
import DataPickerContainer from '../containers/DatePickerContainer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => {
    return (
        <div>
            <MuiThemeProvider>
                <DataPickerContainer/>
            </MuiThemeProvider>
            <MuiThemeProvider>
                <TaskListContainer/>
            </MuiThemeProvider>
        </div>
    );
}; 

export default App;