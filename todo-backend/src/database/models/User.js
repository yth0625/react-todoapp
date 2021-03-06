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
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync();

User.createUser = async (user) => {
    if ( user.username == '' || user.password == '')
        throw {code: 400, message: 'Not Match'};
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

User.login = async (username, password)  => {
    const data = await User.findAll({
        where: {
            username: username
        }
    });
    
    if ( data.length == 0)
        throw {code: 400, message: 'Not Match'};

    const user = data.pop().dataValues;

    const match = await bcrypt.compare(password, user.password);

    delete user.password;

    if (match)
        return user;
    else 
        throw {code: 400, message: 'Not Match'};
}

User.findUser = (id) => {
    return User.findAll({
        where: {
            id: id
        }
    });
};

export default User;