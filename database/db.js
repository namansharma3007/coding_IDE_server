const { Client } = require('pg');
require('dotenv').config();


// const client = new Client({
//     user: 'postgres',
//     password: 'root',
//     host: 'localhost',
//     port: '5432',
//     database: 'coding_users_submissiontokens',
// });
const client = new Client({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    port: process.env.portPostgre,
    database: process.env.database,
});

client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });

module.exports = { client };