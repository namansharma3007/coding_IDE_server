const express = require('express');
const router = express.Router();
const { client } = require('../database/db2');

// get all usernames
router.get('/getUsers', async (req, res) => {
    try {
        const { data: result, error } = await client.from('usernames').select('*');
        if (error) {
            throw error;
        }
        res.status(200).json({
            message: 'Data fetched successfully',
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

// get individual user detail
router.post('/getIndividualUser', async (req, res) => {
    const username = req.body.username;
    try {
        const { data: result, error } = await client.from('usernames').select('*').eq('username', username);
        if (error) {
            throw error;
        }
        res.status(200).json({
            message: 'Data fetched successfully',
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
        const { data: result, error } = await client.from('usernames').insert({ username });
        if (error) {
            throw error;
        }
        res.status(200).json({
            message: 'success',
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
        const { data: result, error } = await client.from('submissiontokens').insert({ user_id, submission_token });
        if (error) {
            throw error;
        }
        res.status(200).json({
            message: 'success',
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
        const { data:result, error } = await client
            .from('submissiontokens')
            .select('submission_id, submission_token, submission_datetime')
            .in('user_id', client
                .from('usernames')
                .select('user_id')
                .eq('username', username)
            )
        if (error) {
            throw error;
        }
        res.status(200).json({
            message: 'Submissions fetched successfully',
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching submissions',
        });
    }
});

// exporting router
module.exports = router;