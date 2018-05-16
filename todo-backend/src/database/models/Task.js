import Sequelize from 'sequelize';

const Task = Sequelize.define('task', {
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

Task.createTask = (payload) => {
    return Task.create(...payload);
};

Task.editTask = (id, payload) => {
    return Task.update(
        ...payload,
        {where: id}
    );
};

Task.findTaskList = (date) => {
    return Task.findAll({
        where: {
            taskdate: date
        }
    });
};

export default Task;
