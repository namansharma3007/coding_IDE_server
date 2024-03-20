CREATE DATABASE IF NOT EXISTS coding_users_submissiontokens;


CREATE TABLE IF NOT EXISTS usernames (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    registration_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS submissiontokens (
    submission_id SERIAL PRIMARY KEY,
    user_id INT,
    submission_token VARCHAR(100) NOT NULL,
    submission_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usernames(user_id)
);
