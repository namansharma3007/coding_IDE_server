const { Client } = require('pg');
require('dotenv').config();


const client = new Client({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: '5432',
    database: 'coding_users_submissiontokens',
});
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });

module.exports = { client };