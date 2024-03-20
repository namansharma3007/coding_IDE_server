const express = require('express');
const router = express.Router();
// const { client } = require('../database/db');
const { client } = require('../database/db2');


// get all usernames
router.get('/getUsers', async (req, res) => {
    try {
        const query = 'SELECT * FROM usernames';
        const result = await client.query(query);
        res.status(200).json({
            message: "Data fetched successfully",
            data: result.rows,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching data',
            data: null,
        });
    }
});


// get individualuserdetail
router.post('/getIndividualUser', async (req, res) => {
    const username = req.body.username;
    try {
        const query = 'SELECT * FROM usernames where username=($1)';
        const result = await client.query(query, [username]);
        res.status(200).json({
            message: "Data fetched successfully",
            data: result.rows,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching data',
            data: null,
        });
    }
});

// insert username
router.post('/insertUsername', async (req, res) => {
    const username = req.body.username;
    try {
        const query = 'INSERT INTO usernames (username) VALUES ($1)';
        await client.query(query, [username]);
        res.status(200).json({
            message: "success",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while inserting data',
        });
    }
});

// insert submissiontoken
router.post('/insertSubmissionToken', async (req, res) => {
    const { user_id, submission_token } = req.body;
    try {
        const query = 'INSERT INTO submissiontokens (user_id, submission_token) VALUES ($1, $2)';
        await client.query(query, [user_id, submission_token]);
        res.status(200).json({
            message: "success",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while inserting data',
        });
    }
});


//fetch submissions by username
router.post('/fetchSubmissionByUserName', async (req, res) => {
    const { username } = req.body;
    try {
        const query = `
            SELECT st.submission_id, u.username, st.submission_token, st.submission_datetime
            FROM submissiontokens st
            JOIN usernames u ON st.user_id = u.user_id
            WHERE u.username = $1
        `;
        const result = await client.query(query, [username]);

        res.status(200).json({
            message: "Submissions fetched successfully",
            data: result.rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching submissions',
        });
    }
});



//exporting router
module.exports = router;