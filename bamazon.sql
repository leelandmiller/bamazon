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



SELECT * FROM products;
SELECT * FROM orders;
SELECT * FROM ordered_products;
