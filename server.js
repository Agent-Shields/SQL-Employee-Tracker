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
    return inquirer
    .prompt(questions)
    .then(data => {
        if (data.toDo === 'View all departments'){
            const sql = `SELECT * FROM department;`;

            db.query(sql, (err, row) => {
                if (err) {
                    console.log(err)
                    return;
                }
                console.table(row)
            })
        }
        
    })
}

// start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    askQuestions();
})