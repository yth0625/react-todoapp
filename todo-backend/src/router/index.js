import Task from '../database/models/Task';

export default (app) => {
    app.post('/task', (req, res) => {
        const task = req.body;
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
        const id = req.body;
        Task.removeTask(id).then( result => {
            res.status(200).send(result);
        }).catch( error => {
            res.status(400).send(error);
        });
    });

    app.post('/taskList', (req, res) => {
        const {taskdate} = req.body;
        console.log(taskdate);
        Task.findTaskList(new Date(taskdate)).then( result => {
            res.status(200).send(result);
        }).catch( error => {
            res.status(400).send(error);
        });
    });
};