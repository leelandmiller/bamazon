// Manager View
const mysql = require('mysql');
const inq = require('inquirer');
const Table = require('easy-table');

let managerView = () => {
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bamazon_db'
    });

    const LOW_INVENTORY = 30;

    let menu = () => {
        inq.prompt([
            {
                'type': 'list',
                'message': 'What do you want to do?',
                'choices': [
                    'View Products',
                    'View Low Inventory',
                    'Add to Inventory',
                    'Add New Product'
                ],
                'name': 'action'
            }
        ]).then((menu) => {
            switch (menu.action) {
                case 'View Products':
                    showProducts();
                    break;
                case 'View Low Inventory':
                    getLowInventory();
                    break;
                case 'Add to Inventory':
                    addInventory();
                    break;
                case 'Add New Product':
                    addNewProduct();
                    break;
                default: break;
            }
        });
    };
    // manager - view all products
    let showProducts = () => {
        connection.query('SELECT * FROM products', (err, data) => {
            if (err) throw err;
            console.log(Table.print(data));
            menu();
        })
    };

    // manager - see products with low inventories
    let getLowInventory = () => {
        let insert = [LOW_INVENTORY];
        let sqlQuery = 'SELECT * FROM products where stock < ?';

        connection.query(sqlQuery, insert, (err, res) => {
            if (err) throw err;
            console.log(Table.print(res));
            menu();
        });
    };

    // manager - replenish inventory to a selected item
    let addInventory = () => {
        inq.prompt([
            {
                'name': 'id',
                'message': 'Which product? (ID)'
            },
            {
                'name': 'quantity',
                'message': 'How much do you want to add?'
            }
        ]).then((selection) => {
            let inserts = [parseInt(selection.quantity), parseInt(selection.id)];
            let sqlQuery = 'UPDATE products SET stock = stock + ? WHERE id = ?';

            connection.query(sqlQuery, inserts, (err, res) => {
                if (err) throw err;
                // just lets the manager know that the product's inventory update was successful
                console.log(`

            Product Updated!

                `);
                menu();
            });
        });
    };

    // manager - add a new product to the store
    let addNewProduct = () => {
        inq.prompt([
            {
                'name': 'product',
                'message': 'Product Name',
            },
            {
                'name': 'department',
                'message': 'Department',
            },
            {
                'name': 'price',
                'message': 'Price',
            },
            {
                'name': 'stock',
                'message': 'Stock'
            }
        ]).then((newItem) => {
            newItem.price = parseInt(newItem.price);
            newItem.stock = parseInt(newItem.stock);

            connection.query('INSERT INTO products SET ?', newItem, (err, res) => {
                if (err) throw err;

                console.log(`

            Product Added!

                `);
                menu();
            });
        });
    };

    menu();
};

module.exports = managerView;
