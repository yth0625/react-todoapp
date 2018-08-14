import db from '../index';
import Sequelize from'sequelize';

const Task = db.define('task', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: Sequelize.STRING
    },
    check: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    duedate: {
        type: Sequelize.DATE
    },
    taskdate: {
        type: Sequelize.DATE,
        allowNull: false    
    },
    userid: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Task.addTask = (task, userid) => {
    if (task.duedate === undefined)
        task.duedate = task.taskdate;
        
    if (task.text === undefined)
        task.text = '';

    task.userid = userid;
    
    return Task.create(task);
};

Task.editTask = (task) => {
    return Task.update(
        task,
        {   where: {
                id: task.id
            }
        }
    );
};

Task.removeTask = (id) => {
    return Task.destroy({
        where: id
    });
};

Task.findTaskList = (date, id) => {
    return Task.findAll({
        where: {
            taskdate: date,
            userid: id
        }
    });
};

Task.sync();

export default Task;