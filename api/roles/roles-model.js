const db = require('../../data/db-config');

function getByFilter(filter) {
    return db('roles').where(filter).first();
}

module.exports = {
    getByFilter
}