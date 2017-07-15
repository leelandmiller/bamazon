DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;


CREATE TABLE products (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    price INTEGER(11) NOT NULL,
    stock INTEGER(11) NOT NULL,
    primary key(id)
);

CREATE TABLE orders (
	id INT AUTO_INCREMENT NOT NULL,
    total INT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE ordered_products (
	order_id INT NOT NULL,
    prod_id INT NOT NULL,
    quantity INT NOT NULL
);

CREATE TABLE departments (
	department_id INT NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    overhead INT NOT NULL,
    primary key(department_id)
);

ALTER TABLE products DROP COLUMN product_sales;

ALTER TABLE products ADD COLUMN product_sales INT NOT NULL DEFAULT 0;

SELECT * FROM products;
SELECT * FROM orders;
SELECT * FROM ordered_products;
