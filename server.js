const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { listenerCount } = require('./db/connection');

// questions to be asked in the CLI
const questions = [
    {
        type: 'list',
        name: 'toDo',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
]

// sql query to view all departments
queryDept = () => {
    const sql = `SELECT * FROM department;`;
            
    db.query(sql, (err, deptTable) => {
        if (err) {
            console.log(err)
            return;
        }
        console.table(deptTable);
    })
};

// sql query to view all roles
queryRole = () => {
    const sql = `SELECT * FROM role`;

    db.query(sql, (err, roleTable) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(roleTable);
    })
};

// sql query to view all employees
queryEmployees = () => {
    const sql = `SELECT * FROM employee`

    db.query(sql, (err, employeeTable) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(employeeTable);
    })
};

// sql query to add department
addDept = () => {
    // get user input for department name
    inquirer
    .prompt(
        {
            type: 'input',
            name: 'name',
            message: 'What is the new department name?'
        }
    )
    // add department to db based off user input
    .then(deptAnswer => {
        console.log(deptAnswer.name)
        const sql = `INSERT INTO department (name) VALUES (?)`

        let params = deptAnswer.name
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }

        })
    }
    )
}

// sql query to add role
addRole = () => {
    // get user input for role information
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the role title?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What department does this role belong to?'
        }
    ]
    )

    // add role to db based off user input
        .then(roleAnswer => {
            console.log(roleAnswer)
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`

            let params = [roleAnswer.title, roleAnswer.salary, roleAnswer.department_id]
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
                }

            })
        }
        )
}


// sql query to add employee
addEmployee = () => {
    // get user input for employee information
    inquirer
    .prompt(
        [
            {
                type: 'input',
                name: 'first_name',
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the employee's last name?"
            },
            {
                type: 'input',
                name: 'role_id',
                message: "What is the employee's role id?"
            },
            {
                type: 'input',
                name: 'manager_id',
                message: "What Manager ID does this employee belong to?"
            }
        ]
    )

    // add employee to db based off user input
    .then(employeeAnswer => {
        console.log(employeeAnswer)
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`

        let params = [employeeAnswer.first_name, employeeAnswer.last_name, employeeAnswer.role_id, employeeAnswer.manager_id]
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }

        })
    }
    )
}

// sql query to update employee role
updateRole = () => {
  // get user input for updated employee role
  inquirer
  .prompt([
     {
         type: 'input',
         name: 'role_id',
         message: 'What is the updated role id of the employee?'
     },
     {
         type: 'input',
         name: 'id',
         message: "What is the employee's id?"
     }
    ]
  )

  // update employee role in DB based off user input
  .then(employeeInfo => {
      let sql = `UPDATE employee SET role_id = ? WHERE id = ?`
      let params = [employeeInfo.role_id, employeeInfo.id];

      db.query(sql, params, (err, result) => {
          if (err) {
              console.log(err)
          }
          console.log('Updated employee')
      })
  })
}

// function to start asking inquirer questions
const askQuestions = () => {
    inquirer
    .prompt(questions)
    .then(data => {
        let choices = data.toDo;
        // console.log(choices);
        switch (choices) {
            case 'View all departments':
                queryDept();
                break;

            case 'View all roles':
                queryRole();
                break;

            case 'View all employees':
                queryEmployees();
                break;

            case 'Add a department':
                addDept();
                break;

            case 'Add a role':
                addRole();
                break;

            case 'Add an employee':
                addEmployee();
                break;

            case 'Update an employee role':
                updateRole();
                break;
        }
    })
}

// start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    askQuestions();
})