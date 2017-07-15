const mysql = require('mysql');
const inq = require('inquirer');
const Table = require('easy-table');

const customerView = require('./Customer');
const managerView = require('./Manager');
const supervisorView = require('./Supervisor');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'bamazon_db'
});

connection.connect((err) => {
    initialize();
})

let initialize = () => {
    inq.prompt([
        {
            'type': 'list',
            'message': 'Customer, Admin, Supervisor?',
            'name': 'userType',
            'choices': ['Customer', 'Manager', 'Supervisor']
        }
    ]).then((answers) => {
        console.log(answers.userType)
        switch (answers.userType) {
            case 'Customer':
                connection.query('Select * From products', (err, res) => {
                    customerView();
                    connection.end();
                })
                break;
            case 'Manager':
                managerView();
                connection.end();
                break;
            case 'Supervisor':
                supervisorView();
                connection.end();
                break;
        }
    });
};
