const express = require('express');
const router = express.Router();
const {client} = require('../database/db2')
// get all usernames
router.get('/getUsers', async (req, res) => {
    try {

        const result = await client.query(`SELECT * FROM usernames`);
        res.status(200).json({
            message: "Data fetched successfully",
            data: result.data.rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching data',
            data: null,
        });
    }
});

// get individual user detail
router.post('/getIndividualUser', async (req, res) => {
    const username = req.body.username;
    try {

        const result = await client.query(`SELECT * FROM usernames WHERE username=${username}`);
        res.status(200).json({
            message: "Data fetched successfully",
            data: result,
        });
    } catch (error) {
        console.error(error);
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

        await client.query(`INSERT INTO usernames (username) VALUES (${username})`);
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

// insert submission token
router.post('/insertSubmissionToken', async (req, res) => {
    const { user_id, submission_token } = req.body;
    try {
        await client.query(`INSERT INTO submissiontokens (user_id, submission_token) VALUES (${user_id}, ${submission_token})`);
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

// fetch submissions by username
router.post('/fetchSubmissionByUserName', async (req, res) => {
    const { username } = req.body;
    try {

        const result = await client.query(`
            SELECT st.submission_id, u.username, st.submission_token, st.submission_datetime
            FROM submissiontokens st
            JOIN usernames u ON st.user_id = u.user_id
            WHERE u.username = ${username}`);

        res.status(200).json({
            message: "Submissions fetched successfully",
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching submissions',
        });
    }
});

module.exports = router;