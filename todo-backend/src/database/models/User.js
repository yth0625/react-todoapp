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

User.sync({force: true});

User.createUser = async (user) => {
    if ( user.username == '' || user.password == '')
        throw {error: {code: 403, message: '유저네임 혹은 패스워드가 비어있습니다.'}};
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

    // const salt = await bcrypt.genSalt(10).then( salt => {
    //     return salt;
    // });

    // await bcrypt.hash(password, salt).then( hash => {
    //     password = hash;
    // });

    const data = await User.findAll({
        where: {
            username: username
        }
    });

    const user = data.pop().dataValues;

    const match = await bcrypt.compare(password, user.password);

    delete user.password;

    if (match)
        return user;
    else 
        throw {error: {code: 401, message: '입력된 계정과 일치하는 사용자 정보를 찾을 수 없습니다.'}};
}

User.findUser = (id) => {
    return User.findAll({
        where: {
            id: id
        }
    });
};

export default User;