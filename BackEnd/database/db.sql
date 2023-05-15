CREATE DATABASE postgres;

CREATE TABLE task(
    id SERIAL NOT NULL,
    title character varying(255),
    description character varying(255),
    PRIMARY KEY(id)
);