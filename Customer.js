const mysql = require('mysql');
const inq = require('inquirer');
const Table = require('easy-table');

let customerView = () => {
    // used to track all items the current customer wants to purchase
    let ShoppingCart = {
        total: 0,
        items: [],
    };

    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bamazon_db'
    });

    connection.connect((err) => {
        connection.query('SELECT * FROM products', (err, data) => {
            showProducts(data);
            productSelection(data);
        });
    });

    // show all avail products to customer
    let showProducts = (data) => {
        console.log(Table.print(data));
    };

    // allows customer to choose a product (by ID) and qty desired
    let productSelection = (data) => {
        inq.prompt([
            {
                'type': 'input',
                'message': 'Which product do you want to buy? (ID)',
                'name': 'id',
            },
            {
                'type': 'input',
                'message': 'How many do you want to buy?',
                'name': 'quantity',
            }
        ]).then((item) => {
            let insert = { id: parseInt(item.id) };
            let sqlQuery = 'SELECT * FROM products WHERE ?';
            // pull the selected product from db
            connection.query(sqlQuery, insert, (err, res) => {
                // update product stock IF their orderQuantity < stock
                buyProduct(res, item);
                // console.log(Table.print(res));
            });
        });
    };

    let buyProduct = (res, item) => {
        // if order quantity is <= item's stock in db
        let newQty = res[0].stock;
        if (item.quantity <= newQty) {
            // subtract order quantity from item's stock in db
            newQty -= item.quantity;
            // UPDATE db inventory
            updateInventory(item, newQty);
        } else {
            // order didn't go through. order qty higher than actual inventory amount
            console.log('Not enough in stock');
        }
    }

    let updateInventory = (item, newQty) => {
        let insert = [newQty, parseInt(item.id)];
        let updateQuery = 'UPDATE products SET stock = ? WHERE id = ?';

        connection.query(updateQuery, insert, (err, res) => {
            addToCart(item);
        });
    };

    let showCart = (checkout) => {
        // displays all items in customer's shopping cart & total
        console.log(`
===========================
====== ${checkout ? 'Order Placed!' : 'Shopping Cart'} ======
===========================
            `);
        console.log(Table.print(ShoppingCart.items));
        console.log(`
=============
TOTAL: $${ShoppingCart.total}
=============
        `);
    }

    let addToCart = (item) => {
        let insert = [parseInt(item.id)];
        connection.query('SELECT id,product,department,price FROM products WHERE id = ?', insert, (err, data) => {

            // UPATE ShoppingCart total & items
            ShoppingCart.total += data[0].price * item.quantity;
            let newCartItem = data[0];
            newCartItem.quantity = parseInt(item.quantity);
            ShoppingCart.items.push(newCartItem);
            showCart();
            checkoutPrompt();
        });
    };
    // ask user if they want to checkout or keep adding items to their cart
    let checkoutPrompt = () => {
        inq.prompt([
            {
                'type': 'list',
                'message': 'Keep shopping or checkout?',
                'name': 'choice',
                'choices': ['Keep Shopping', 'Checkout']
            }
        ]).then((checkoutPrompt) => {
            // if they want to keep shopping,
            if (checkoutPrompt.choice === 'Keep Shopping') {
                // query the db to show products
                connection.query('SELECT * FROM products', (err, res) => {
                    showProducts(res);
                    productSelection(res);
                });
            } else {
                checkout();
            }
        });
    };

    // checkout -- show them all items they've ordered and the total cost
    let checkout = () => {
        // show order details, pass in true to meet ternary conditional in showCart()
        showCart(true);

        // update orders TABLE -- INSERT total, id is AUTO INCREMENTING
        let totalInsert = [ ShoppingCart.total ];
        let totalInsertQuery = 'INSERT INTO orders (total) VALUES (?)';
        connection.query(totalInsertQuery, totalInsert, (err, res) => {
            if (err) throw err;

            let prodsInsert = ShoppingCart.items.map(item => [res.insertId, item.id, item.quantity]);
            let prodsInsertQuery = 'INSERT INTO ordered_products (order_id, prod_id, quantity) VALUES ?';

            // INSERT product_id's and associated order_id to ordered_products table
            connection.query(prodsInsertQuery, [prodsInsert], (err, res) => {
                connection.end((error) => {
                    if (err) throw err;
                });
            });
        });
        let inserts = [];
        let prodSalesQuery = 'UPDATE products SET product_sales = product_sales + ? WHERE id = ?';

        ShoppingCart.items.forEach((item) => {
            inserts.push( (item.quantity * item.price), item.id);
            connection.query(prodSalesQuery, inserts, (err, res) => {
                if (err) throw err;
            })
        });
    };
};

module.exports =  customerView;
