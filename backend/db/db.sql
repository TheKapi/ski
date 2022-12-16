CREATE DATABASE ski;

USE ski;

CREATE TABLE user (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    lastname VARCHAR(300) NOT NULL,
    location VARCHAR(300) NOT NULL,
    age VARCHAR(300) NOT NULL,
    distance VARCHAR(300) NOT NULL,
    edit BOOLEAN NOT NULL
);

CREATE TABLE competition (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE user_competition (
    user_id INT NOT NULL,
    competition_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES `user`(id),
    FOREIGN KEY (competition_id) REFERENCES competition(id)
);