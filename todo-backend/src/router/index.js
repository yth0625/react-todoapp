import Task from '../database/models/Task';

export default (app) => {
    app.post('/task', (req, res) => {
        const task = req.body;

        if (task.duedate === undefined)
            task.duedate = task.taskdate;
        
        if (task.text === undefined)
            task.text = '';
        
        Task.create(task).then( result => {
            res.status(200).send(result);
        }).catch( error => {
            res.status(400).send(error);
        });
    });

    app.put('/task', (req, res) => {
        const task = req.body;
        Task.editTask(task).then( result => {
            res.status(200).send(result);
        }).catch( error => {
            res.status(400).send(error);
        });
    });

    app.delete('/task', (req, res) => {
        const taskId = req.body;
        Task.removeTask(taskId).then( result => {
            res.sendStatus(200).send(result);
        }).catch( error => {
            res.status(400).send(error);
        });
    });

    app.post('/taskList', (req, res) => {
        const {taskdate} = req.body;
        Task.findTaskList(new Date(taskdate)).then( result => {
            result.push(taskdate);
            res.status(200).send(result);
        }).catch( error => {
            res.status(400).send(error);
        });
    });
};