import db from '../index';
import Sequelize from'sequelize';

const Task = db.define('task', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    check: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    duedate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    taskdate: {
        type: Sequelize.DATE,
        allowNull: false    
    }
});

Task.addTask = (task) => {
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

Task.findTaskList = (date) => {
    return Task.findAll({
        where: {
            taskdate: date
        }
    });
};

export default Task;
