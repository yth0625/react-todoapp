import Task from '../database/models/Task';
import User from '../database/models/User';

export default (app) => {
    app.post('/task', (req, res) => {
        const task = req.body;

        if (task.duedate === undefined)
            task.duedate = task.taskdate;
        
        if (task.text === undefined)
            task.text = '';

        task.userid = 'asdf';

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
        Task.removeTask(taskId).then( () => {
            //TODO: json 붙혀서 리스폰스 보내기
            res.status(200).json('Delete Complete!');
        }).catch( error => {
            res.status(400).send(error);
        });
    });

    app.post('/taskList', (req, res) => {
        const {taskdate} = req.body;
        //const {userId} = req.body;
        Task.findTaskList(new Date(taskdate)).then( result => {
            result.push(taskdate);
            res.status(200).send(result);
        }).catch( error => {
            res.status(400).send(error);
        });
    });

    app.post('/user', (req, res) => {
        const user = req.body;
        User.createUser(user).then( result => {
            res.status(200).send(result);
        }).catch( error => {
            res.status(400).send(error);
        });
    });

    app.put('/user', (req, res) => {
        const user = req.body;
        User.editUser(user).then( result => {
            res.status(200).send(result);
        }).catch( error => {
            res.status(400).send(error);
        });
    });

    app.delete('/user', (req, res) => {
        const usreId = req.body;
        User.deleteUser(usreId).then( result => {
            res.sendStatus(200).send(result);
        }).catch( error => {
            res.status(400).send(error);
        });
    });

    app.get('/user', (req, res) => {
        const userId = req.body;
        User.findUser(userId).then( result => {
            res.status(200).send(result);
        }).catch( error => {
            res.status(400).send(error);
        });
    });
};