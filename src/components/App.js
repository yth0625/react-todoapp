import React from 'react';
import TaskListContainer from '../containers/TaskListContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => {
    return (
        <div>
            <MuiThemeProvider>
                <TaskListContainer/>
            </MuiThemeProvider>
        </div>
    );
}; 

export default App;