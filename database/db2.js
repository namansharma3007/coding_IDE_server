const { db, sql } = require('@vercel/postgres');

const client = await db.connect();

console.log("Connected to Vercel Postgres successfully!");

module.exports = {client, sql};