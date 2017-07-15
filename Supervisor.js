const mysql = require('mysql');
const inq = require('inquirer');
const Table = require('easy-table');

let supervisorView = () => {
    let menu = () => {
        inq.prompt([
            {
                'name': 'choice',
                'message': 'What do you want to do?',
                'type': 'list',
                'choices': ['View Sales by Department', 'Create New Department']
            },
        ]).then((menu) => {
            if (menu.choice === 'View Sales by Department') {
                viewByDep();
            } else if (menu.choice === 'Create New Department') {
                console.log('Supervisor View is under construction. Sorry');
            } else {
                console.log("How'd you get here?");
            }
        });
    };

    let viewByDep = () => {
        // I didn't finish Supervisor.js
        // Sorry
        console.log('Supervisor View is under construction. Sorry');
    };

    menu();
};

module.exports = supervisorView;
