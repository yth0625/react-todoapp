import db from '../index';
import Sequelize from 'sequelize';

import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';

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

User.createUser = async (user) => {
    user.id = uuid();
    
    const salt = await bcrypt.genSalt(10).then( salt => {
        return salt;
    });

    await bcrypt.hash(user.password, salt).then( hash => {
        user.password = hash;
    });

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

User.sync();

export default User;