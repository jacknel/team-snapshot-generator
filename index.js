const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const DIST_DIR = path.resolve(__dirname, "dist");
const distPath = path.join(DIST_DIR, "team.html");

const render = require("./src/page-template.js");

let teamArray = [];
let idArray = [];

console.log("Welcome! Use `npm run reset` to reset the dist/ folder\n");

function runApp() {
    function inputManager() {
        console.log("Please build your team 👥");
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'managerName',
                    message: 'Enter team manager name.',
                    validate: (answer) => (answer !== "") || "Please enter at least one character."
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: 'Enter team manager ID.',
                    validate: (answer) => (answer.match(/^[0-9]\d*$/) && true) || "Enter a positive number."
                },
                {
                    type: 'input',
                    name: 'managerEmail',
                    message: 'Enter team manager email.',
                    validate: (answer) => (answer.match(/\S+@\S+\.\S+/) && true) || "Enter a valid email address."
                },
                {
                    type: 'input',
                    name: 'managerOfficeNumber',
                    message: 'Enter team manager office number.',
                    validate: (answer) => (answer.match(/^[1-9]\d*$/) && true) || "Enter a positive number greater than zero.",
                },
            ])
            .then((answers) => {
                const manager = new Manager(
                    answers.managerName,
                    answers.managerId,
                    answers.managerEmail,
                    answers.managerOfficeNumber
                );
                teamArray.push(manager);
                idArray.push(answers.managerId);
                createTeam();
            });
    }

    function createTeam() {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'memberChoice',
                    message: 'What would you like to do?',
                    choices: [
                        'Add Engineer',
                        'Add Intern',
                        'Finish Building Team',
                    ],
                }
            ])
            .then((userChoice) => {
                switch (userChoice.memberChoice) {
                    case 'Add Engineer':
                        inputEngineer();
                        break;
                    case 'Add Intern':
                        inputIntern();
                        break;
                    default:
                        buildTeam();        
                }
            });
    }

    function inputEngineer() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'engineerName',
                    message: 'Enter engineer name.',
                    validate: (answer) => (answer !== "") || "Please enter at least one character."
                },
                {
                    type: 'input',
                    name: 'engineerId',
                    message: 'Enter engineer ID.',
                    validate: (answer) => {
                        const pass = answer.match(/^[1-9]\d*$/);
                        if (pass) {
                          if (idArray.includes(answer)) {
                            return 'This ID is already taken. Enter a different number.';
                          } else {
                            return true;
                          }
                        }
                        return 'Enter a positive number greater than zero.';
                      },
                },
                {
                    type: 'input',
                    name: 'engineerEmail',
                    message: 'Enter engineer email.',
                    validate: (answer) => (answer.match(/\S+@\S+\.\S+/) && true) || "Enter a valid email address."
                },
                {
                    type: 'input',
                    name: 'engineerGithub',
                    message: 'Enter engineer Github username.',
                    validate: (answer) => (answer !== "") || "Please enter at least one character.",
                },
            ])
            .then((answers) => {
                const engineer = new Engineer(
                    answers.engineerName,
                    answers.engineerId,
                    answers.engineerEmail,
                    answers.engineerGithub
                );
                teamArray.push(engineer);
                idArray.push(answers.engineerId);
                createTeam();
            });
    }

    function inputIntern() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'internName',
                    message: 'Enter intern name.',
                    validate: (answer) => (answer !== "") || "Please enter at least one character."
                },
                {
                    type: 'input',
                    name: 'internId',
                    message: 'Enter intern ID.',
                    validate: (answer) => {
                        const pass = answer.match(/^[1-9]\d*$/);
                        if (pass) {
                          if (idArray.includes(answer)) {
                            return 'This ID is already taken. Enter a different number.';
                          } else {
                            return true;
                          }
                        }
                        return 'Enter a positive number greater than zero.';
                      },
                },
                {
                    type: 'input',
                    name: 'internEmail',
                    message: 'Enter intern email.',
                    validate: (answer) => (answer.match(/\S+@\S+\.\S+/) && true) || "Enter a valid email address."
                },
                {
                    type: 'input',
                    name: 'internSchool',
                    message: 'Enter intern school.',
                    validate: (answer) => (answer !== "") || "Please enter at least one character.",
                },
            ])
            .then((answers) => {
                const intern = new Intern(
                    answers.internName,
                    answers.internId,
                    answers.internEmail,
                    answers.internSchool
                );
                teamArray.push(intern);
                idArray.push(answers.internId);
                createTeam();
            });
    }

    function buildTeam() {
        fs.writeFileSync(distPath, render(teamArray), "utf-8");
      }

    inputManager();
}

runApp();