import Task from '../database/models/Task';
import User from '../database/models/User';

//TODO: DB 에서 error 시 응답 코드 및 응답 메시지

export default (app) => {
    app.post('/task', (req, res) => {
        const {task} = req.body;
        const {userid} = req.body;

        Task.addTask(task, userid).then( result => {
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
            res.status(200).json('Delete Complete!');
        }).catch( error => {
            res.status(400).send(error);
        });
    });

    app.post('/taskList', (req, res) => {
        const {taskdate} = req.body;
        const {userId} = req.body;
        Task.findTaskList(new Date(taskdate), userId).then( result => {
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

    app.post('/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        User.login(username, password).then( result => {
            res.status(200).send(JSON.stringify(result));
        }).catch( error => {
            console.log(error);
            res.status(error.code).send(error.message);
        });
    });
};