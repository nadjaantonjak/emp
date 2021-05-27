// requiring in dependencies
const inquirer = require('inquirer')
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',

    // Your port, if not 3306
    port: 3307,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'Ieatgrass2001',
    database: 'employee_trackerDB',
});



// function created to start application  
const start = () => {

inquirer.prompt({
    // application's start question
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees By Department', 
                  'View All Employees By Roles', 'View All Departments', 'View All Roles', 'Add A New Department',
                  'Add A New Role', 'Add A New Employee', "Update An Employee's Role", 'Exit'
                ],
        name: 'userChoice'

     }).then( (answer) => {

        // choose what function to run depending on user input
    if (answer.userChoice === 'View All Employees') {
        viewAllEmployees();
    }
    else if (answer.userChoice === 'View All Employees By Department') {
        viewByDepartment();
    }
    else if (answer.userChoice === 'View All Employees By Roles') {
        viewByRole();
    }
    else if (answer.userChoice === 'View All Departments') {
        viewAllDepartments();
    }
    else if (answer.userChoice === 'View All Roles') {
        viewAllRoles();
    }
    else if (answer.userChoice === 'Add A New Department') {
        addDepartment();
    }
    else if (answer.userChoice === 'Add A New Role') {
        addRole();
    }
    else if (answer.userChoice === 'Add A New Employee') {
        addEmployee();
    }
    else if (answer.userChoice === "Update An Employee's Role") {
        updateRole();
    }
    else {
        connection.end();
    }

})


 };


// ----------- VIEW FUNCTIONS ------------------------------

const viewAllDepartments = () => { 
    // selecting all data from the departments table in DB
    connection.query('SELECT * FROM departments', (err, res) => {
        // if there is an error, display error
        if (err) throw err;
        
        // mapping through data and displaying id and name
        res.map( ({id, name}) => {
            console.log(`
            Department ID: ${id} 
            Department Name: ${name}
                        `)
        } )

        // calling start function 
        start();
    })
};

const viewAllRoles = () => {
    // selecting all data from role table in DB
    connection.query('SELECT * FROM role', (err, res) => {
        // if there is an error, display error
        if (err) throw err;
        
        // mapping through data and displaying id, title, salary and department id
        res.map(({ id, title, salary, department_id }) => {
            console.log(`
            Role ID: ${id} 
            Title of Role: ${title}
            Salary: ${salary}
            Department ID: ${department_id}
                        `)
        })
        
        // calling start function
        start();
    });
};

const viewAllEmployees = () => {
    // inner joining the departments and role table with employee table in DB
    connection.query('SELECT employee.id, first_name, last_name, salary, title, name, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN departments ON role.department_id = departments.id', (err, res) => {
        // if there is an error, display error
        if (err) throw err;

        // mapping through data and displaying 1st name, last name, role title, name of department and manager id
        res.map(({id, first_name, last_name, title, name, manager_id }) => {
            console.log(`
            Employee ID: ${id} 
            First Name: ${first_name}
            Last Name: ${last_name}
            Role Title: ${title}
            Department: ${name}
            Manager ID: ${manager_id}
                        `)
        })
        // calling start function
        start();
    })
 };

const viewByDepartment = () => {

    // selecting all data from departments table in DB
    connection.query('SELECT * FROM departments', (err, res) => {
        inquirer.prompt({
            // looping through all departments and displaying it to user to choose a department they want to choose
            type: 'rawlist',
            message: 'What department do you want to view?',
            choices: function () {
                let choiceArray = [];
                for (let i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].name);
                }
                return choiceArray;
            },
            name: 'depName'
        }).then((answer) => {

            // saving the chosen department infp 
            let chosenDepart = [];
            for (let i = 0; i < res.length; i++) {
                if (res[i].name === answer.depName) {
                    let id = res[i]
                    chosenDepart.push(id)
                }
            }
            
            // inner joining the departments and role table with employee table in DB
            let query = "SELECT first_name, last_name, salary, title, name, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN departments ON role.department_id = departments.id WHERE departments.id = ? "
           
            connection.query(query, [chosenDepart[0].id], (err, res) => {
                if (err) throw err;

                // looping through all employees of the chosen department
                res.forEach(( {first_name, last_name, salary, title, name, manager_id} ) => {
                    console.log(`
                                First Name: ${first_name}  
                                Last Name: ${last_name}
                                Salary: ${salary}
                                Title of position: ${title}
                                Department: ${name}
                                Manager ID: ${manager_id}`)
                })
            })
            // calling start function
            start();
        });
            
    })
};

const viewByRole = () => {
    
    // selecting all data from role table in DB
    connection.query('SELECT * FROM role', (err, res) => {
        inquirer.prompt({
            //  looping through all roles and displaying it to user to choose a role they want to choose
            type: 'rawlist',
            message: 'What role do you want to view?',
            choices: function () {
                let choiceArray = [];
                for (let i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].title);
                }
                return choiceArray;
            },
            name: 'roleName'
        }).then((answer) => {

            // saving chosen role info
            let chosenRole = [];
            for (let i = 0; i < res.length; i++) {
                if (res[i].title === answer.roleName) {
                    let id = res[i]
                    chosenRole.push(id)
                }
            }

             // inner joining the departments and role table with employee table in DB
            let query = "SELECT first_name, last_name, salary, title, name, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN departments ON role.department_id = departments.id WHERE role.id = ? "

            connection.query(query, [chosenRole[0].id], (err, res) => {
                if (err) throw err;

                // looping through all employees of the chosen role
                res.forEach(({ first_name, last_name, salary, title, name, manager_id }) => {
                    console.log(`
                                First Name: ${first_name}  
                                Last Name: ${last_name}
                                Salary: ${salary}
                                Title of position: ${title}
                                Department: ${name}
                                Manager ID: ${manager_id}`)
                })
            })
            // calling start function
            start();
        })
    });


};


// ---------- ADD FUNCTIONS ---------------------------------


const addDepartment = () => {
    inquirer.prompt({
        // asking user what they want to call new department
        type: 'input',
        message: 'What is the name of the department you will like to add to database?',
        name: 'newDepartmentName'
    }).then( (answer) => {
        connection.query(
            // inserting new department into DB 
            'INSERT INTO departments SET ?',
            {
                name: answer.newDepartmentName
            },
            function (err) {
                // if there is an error, display error
                if (err) throw err;
                console.log('You created a new department!');
                // calling start function 
                start();
            }
        )
    })
 };

const addRole = () => { 
    // selecting all data from department table in DB
     connection.query ('SELECT * FROM departments', (err, res) => {
         if (err) throw err;

         // convenience variable to ask name and salary of new role
         const roleQuestions = [{
                                 type: 'input',
                                 message: 'What is the title of the role you would like to add?',
                                name: 'roleName'
                                },
                                {
                                    type:'input',
                                    message:'What is the salary of the new role?',
                                    name:'roleSalary'
                                },
                                {
                                // looping through all departments and displaying it to user to choose a department they want to choose
                                type: 'rawlist',
                                message: 'What department do you want to add the new role to?',
                                choices: function () {
                                    let choiceArray = [];
                                    for (let i = 0; i < res.length; i++) {
                         choiceArray.push(res[i].name);
                     }
                     return choiceArray;
                 },
                 name: 'depRoleName'
             }
        ]

         inquirer.prompt(roleQuestions).then(function(answer) {
                
            // saving info of chosen department 
                let chosenDepart =[];
                for (let i =0; i < res.length; i++) {
                    if(res[i].name === answer.depRoleName) {
                        let id = res[i]
                        chosenDepart.push(id)
                    }
                }

                // adding new role into DB
               connection.query('INSERT INTO role SET ?',
               {
                   title: answer.roleName,
                   salary: answer.roleSalary,
                   department_id: chosenDepart[0].id
               }, (err) => {
                   // if there is an error, display error
                   if (err) throw err;
                   console.log('You successfully added a new role!')
                   // calling start function 
                   start();
               })

            })
     })



};

const addEmployee = () => { 
    
    // selecting all data from the departments table in DB
    connection.query('SELECT * FROM departments', (err, res) => {

        // convenience variable to ask user what department to add new employee to
    let departQuestions = [
        {
            type: 'rawlist',
            message: 'What department do you want to add the new role to?',
            choices: function () {
                let choiceArray = [];
                for (let i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].name);
                }
                return choiceArray;
            },
            name: 'depRoleName'
        }];

    inquirer.prompt(departQuestions).then(function (answer) {

            // saving info of chosen department 
            let chosenDepart = [];
            for (let i = 0; i < res.length; i++) {
                if (res[i].name === answer.depRoleName) {
                    let id = res[i]
                    chosenDepart.push(id)
                }
            }
            // selecting all roles from the department the user chose 
            connection.query('SELECT * FROM role WHERE role.department_id = ?', 
            [chosenDepart[0].id],
            (err, results) => {
                // if there is an error, display error
                if (err) throw err;

                // convenience variable to ask the name of employee and what role to add this employee to
                let employeeQuestions = [
                    {
                        type: 'input',
                        message:'What is the first name of the new employee?',
                        name: 'firstName'

                    },
                    {
                        type: 'input',
                        message: 'What is the last name of the employee?',
                        name: 'lastName'

                    },
                    {
                        type: 'rawlist',
                        message: 'What role do you want add this employee to?',
                        choices: function() {
                            let roleArray = [];
                            for (let i = 0; i < results.length; i++) {
                                roleArray.push(results[i].title);
                            }
                            return roleArray;
                        },
                        name: 'employeeRole'
                    }];

                    inquirer.prompt(employeeQuestions).then(function(answer) {

                        // saving info from chosen role
                        let chosenRole = [];
                        for (let i = 0; i < results.length; i++) {
                            if (results[i].title === answer.employeeRole) {
                                chosenRole.push(results[i])
                            }
                        }

                        // if the user choose a manager role, the manger id of the employee is set to 0
                        let managerId = [];
                            if ( answer.employeeRole === 'Manager') {
                                let id = 0
                                managerId.push(id)
                            }
                            // if the user chooses an other role, the manager id of the employee is set to the manager of that department
                            else {
                               let id = results[0].id
                                managerId.push(id)
                            }

                         // adding new employee into DB    
                        connection.query('INSERT INTO employee SET ?',
                            {
                                first_name: answer.firstName,
                                last_name: answer.lastName,
                                role_id: chosenRole[0].id,
                                manager_id: managerId
                            }, (err) => {
                                // if there is an error, display error 
                                if (err) throw err;
                                console.log('You successfully added a new role!')
                                // calling start function 
                                start();
                            })

                    })
                })
            })
        })
    };



// ---------- UPDATE ------------------------------

const updateRole = () => { 
    // inner joining the departments and role table with employee table in DB
    connection.query('SELECT first_name, last_name, salary, title, name, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN departments ON role.department_id = departments.id', (err, res) => {
        // if there is an error, display error 
        if (err) throw err;

        // convenience variable to ask updated role name, salary and what is the employee they want to choose
        const updateQuestion = [
            {
                 // looping through all employees and displaying it to user to choose an employee they want to choose
                type: 'rawlist',
                message: 'What employee do you want to update?',
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].first_name + ' ' + res[i].last_name);
                    }
                    return choiceArray;
                },
                name: 'employeeName'
            },
            {
                type: 'input',
                message: 'What is the name of the updated role?',
                name: 'newRoleName'
            },
            {
                type:'input',
                message: 'What is the salary of the updated role?',
                name: 'newRoleSalary'
            }
        ];

        inquirer.prompt(updateQuestion).then((answer) => {

            // saving info of chosen employee
            let chosenEmployee = [];
            for (let i = 0; i < res.length; i++) {
                if (res[i].first_name + ' ' + res[i].last_name == answer.employeeName) {
                    chosenEmployee.push(res[i])
                }
            }
            
            // updating employee the user choice AND changing the role title and salary of that employee
            connection.query(
                "UPDATE employee INNER JOIN role ON employee.role_id = role.id SET ? WHERE ?", 
            [ 
                {
                    title: answer.newRoleName,
                    salary: answer.newRoleSalary
                }, 
                { 
                    first_name: chosenEmployee[0].first_name
                }
            ],
            (err, res) => {
                // if there is an error, display error
                if (err) throw err;
                console.log("Successfully updated employee's role")
                // calling start function 
                start();
            })
        })
    })
}; 




// establishing a connection with the SQL Database
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    // kicking off the application 
 start();
});
