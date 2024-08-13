CREATE TABLE IF NOT EXISTS "User"(
    id SERIAL NOT NULL,
    firstName varchar(250) NOT NULL,
    lastName varchar(250) NOT NULL,
    birthDate timestamp NOT NULL,
    gender varchar(10) NOT NULL,
    PRIMARY KEY (id)
);