CREATE TABLE users (
                       userid UUID NOT NULL,
                       name VARCHAR(255) NOT NULL,
                       role VARCHAR(255) NOT NULL,
                       username VARCHAR(255) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       PRIMARY KEY (userid)
);