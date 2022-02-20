const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

// questions to be asked in the CLI
const questions = [
    {
        type: 'list',
        name: 'toDo',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
]

// function to start asking inquirer questions
const askQuestions = () => {
    inquirer
    .prompt(questions)
    .then(data => {
        if (data.toDo === 'View all departments') {
            const sql = `SELECT * FROM department;`;

            db.query(sql, (err, deptTable) => {
                if (err) {
                    console.log(err)
                    return;
                }
                console.table(deptTable);
            })
        } else if (data.toDo === 'View all roles') {
            const sql = `SELECT * FROM role`;

            db.query(sql, (err, roleTable) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.table(roleTable)
            })
        } else if (data.toDo === 'View all employees') {
            const sql = `SELECT * FROM employee`

            db.query(sql, (err, employeeTable) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.table(employeeTable)
            })
        } else if (data.toDo === 'Add a department') {
            
        } else if (data.toDo === 'Add a role') {

        } else if (data.toDo === 'Add an employee') {

        } else if (data.toDo === 'Update an employee role') {

        }
        
    })
}

// start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    askQuestions();
})