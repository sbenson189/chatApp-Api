DROP DATABASE IF EXISTS chat_db;

CREATE DATABASE chat_db;

\c chat_db;

-- User Info --

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT,
    email TEXT UNIQUE
);

-- Posts -- 

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users ON DELETE SET NULL,
    content TEXT NOT NULL,
    post_date TEXT
);

-- Seed DB --

INSERT INTO users ( 
    username,
    password,
    first_name,
    last_name,
    phone_number,
    email
)

VALUES (
    'testUsername',
    'testPassword',
    'myFirstName',
    'myLastName',
    '111-111-1111',
    'email@email.com'
);

INSERT INTO posts ( 
    user_id,
    content,
    post_date
)

VALUES (
    '1',
    'this is a new post example',
    '07-01-2021'
);