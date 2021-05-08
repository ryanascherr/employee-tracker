const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql");

searchStuff = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "answer",
            message: "How to you want to do?",
            choices: ["Add a department", "Add a role", "Add an employee", "View departments", "View roles", "View employees"],
        }
    ]).then(({answer}) => {
        switch(answer) {
            case "Add a department":
                console.log("Success!");
                break;
            case "Add a role":
                console.log("Success!");
                break;
            case "Add a employee":
                console.log("Success!");
                break;
        }
    })
}

searchStuff();