DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE departments (
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(30),
PRIMARY KEY(id)
);

CREATE TABLE role (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary INT,
department_id INT,
PRIMARY KEY(id)
);

CREATE TABLE employee(
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
PRIMARY KEY(id)
);


--           DEPARTMENTS

-- creating departments into DB

INSERT INTO departments (name) VALUES ('Sales');
INSERT INTO departments (name) VALUES ('Engineering');
INSERT INTO departments (name) VALUES ('Finance');
INSERT INTO departments (name) VALUES ('Legal');


--               ROLES

-- creating roles for sales department into DB

INSERT INTO role (title, salary, department_id) 
VALUES ('Sales Manager', 80000, 1);

INSERT INTO role (title, salary, department_id) 
VALUES ('Sales Lead', 70000, 1);

INSERT INTO role (title, salary, department_id) 
VALUES ('Salesperson', 50000, 1);


-- creating roles for engineering department into BD

INSERT INTO role (title, salary, department_id) 
VALUES ('Engineer Manager', 80000, 2);

INSERT INTO role (title, salary, department_id) 
VALUES ('Engineer Lead', 70000, 2);

INSERT INTO role (title, salary, department_id) 
VALUES ('Junior Engineer', 50000, 2);


-- creating roles for finance department into DB

INSERT INTO role (title, salary, department_id) 
VALUES ('Account Manager', 80000, 3);

INSERT INTO role (title, salary, department_id) 
VALUES ('Lead Accountant', 70000, 3);

INSERT INTO role (title, salary, department_id) 
VALUES ('Accountant', 50000, 3);


-- creating roles for legal department into DB 

INSERT INTO role (title, salary, department_id) 
VALUES ('Legal Team Manager', 80000, 4);

INSERT INTO role (title, salary, department_id) 
VALUES ('Legal Team Lead', 70000, 4);

INSERT INTO role (title, salary, department_id) 
VALUES ('Lawyer', 50000, 4);






--                EMPLOYEES  

-- creating employees for sales into DB

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jane', 'Doe', 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mark', 'Brown', 3, 1);




-- creating employees for engineering into DB

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Emily', 'Carp', 4, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('David', 'Impey', 5, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Nadja', 'Antonjak', 6, 4);


-- creating employees for finance into DB

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 7, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 8, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 9, 7);


-- creating employees for legal into DB

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 10, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 11, 10);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 12, 10);




SELECT * FROM departments;
SELECT * FROM role;
SELECT * FROM employee;