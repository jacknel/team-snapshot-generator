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

    }

    function inputEngineer() {

    }

    function inputIntern() {

    }

    function buildTeam() {

    }

    createManager();
}

runApp();