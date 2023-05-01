const db = require('../../data/db-config');


function getAll() {
    return db('Users').select('id', 'username');  // []
}

function getById(id) {
    return db('Users').where('id', id).first();  // {}
}

function getByFilter(filter){
    return db('users').where(filter); // []
}

async function create(user) {
    const [id] = await db('Users').insert(user);
    return getById(id);
}

module.exports = {
    getAll, 
    getByFilter,
    create,
}