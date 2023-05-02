const db = require('../../data/db-config');
const Role = require('../roles/roles-model');


function getAll() {
    return db('Users as u')
            .leftJoin('Roles as r', 'u.role_id', 'r.id')
            .select(
                'u.id', 
                'u.username',
                'r.name as role_name');  // []
}

function getById(id) {
    return db('Users as u')
            .leftJoin('Roles as r', 'u.role_id', 'r.id')
            .select(
                'u.id', 
                'u.username',
                'r.name as role_name')
            .where('u.id', id)
            .first();  // {}
}

function getByFilter(filter){
    return db('users as u')
            .leftJoin('Roles as r', 'u.role_id', 'r.id')
            .select(
                'u.id', 
                'u.username',
                'u.password',
                'r.name as role_name')
            .where(filter); // []
}

async function create(user) {
    let id;
    let newUser;
    const payload = {
        username: user.username,
        password: user.password
    }
    await db.transaction(async trx=> {
        const role = await trx('Roles').where({name: user.role}).first();
        payload.role_id = role.id;
        [id] = await trx('Users').insert(payload);
        newUser = await trx('Users').where({id: id}).first();
    })
    return newUser;
}

module.exports = {
    getAll, 
    getByFilter,
    create,
}