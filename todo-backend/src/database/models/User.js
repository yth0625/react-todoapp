import db from '../index';
import Sequelize from 'sequelize';

const User = db.define('user', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.createUser = (user) => {
    return User.create(user);
};

User.editUser = (user) => {
    return User.update(
        user,
        {   where: {
                id: user.id
            }
        }
    );
};

User.deleteUser = (id) => {
    return User.destroy({
        where: id
    });
};

User.findUser = (id) => {
    return User.findAll({
        where: {
            id: id
        }
    });
};

User.sync({force:true});

export default User;