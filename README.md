# bamazon
## Node.js & MySQL

Bamazon is a CLI Amazon-like storefront utilizing MySQL and Node.js

### To Run:
```npm install```

Open and run `bamazon.sql` to create the MySQL database and create the necessary tables.

##### Entry Point:
Run command `node app.js` to start the application.

### Standout Features:

##### Customer View:
* View all available Products & Details:
	* Department
	* Price 
	* Stock
	* Total Product Sales (is this a popular item?!)
* Purchase multiple items & multiple quantities.
	* Items are stored in your shopping cart until you are ready to checkout!


##### Manager View:
* View all available Products & Details
* View a filtered list of Products with low inventories
* Add inventory to items that are low in stock
* Add new products to the store for customers to purchase

### Coming Soon:

##### Customer View:
* Remove items from cart
* View Cart at any time, without having to add items to your shopping cart

##### Manager View:
* Edit a product's details
* Remove a product from the store

##### Supervisor View:
* Everything.


### What it Looks Like:

![Alt text](customer.gif "Title")
