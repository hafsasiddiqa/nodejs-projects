#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
let sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    let neonTitle = chalkAnimation.neon('Lets calculate some magic...');
    await sleep();
    neonTitle.stop();
    console.log(chalk.red(`_______________________
       |  _________________  |
       | | JO            0 | |
       | |_________________| |
       |  ___ ___ ___   ___  |
       | | 7 | 8 | 9 | | + | |
       | |___|___|___| |___| |
       | | 4 | 5 | 6 | | - | |
       | |___|___|___| |___| |
       | | 1 | 2 | 3 | | x | |
       | |___|___|___| |___| |
       | | . | 0 | = | | / | |
       | |___|___|___| |___| |
       |_____________________| 
     
       
      𝔉𝔬𝔯𝔪𝔲𝔩𝔞𝔱𝔢𝔡 𝔟𝔶 ℌ𝔞𝔣𝔰𝔞
      
      
`));
}
await welcome();
async function askQuestion() {
    const answers = await inquirer
        .prompt([
        {
            type: "list",
            name: "operator",
            message: "Which operation you want to perform? \n",
            choices: ["Addition", "Subtraction", "Multiplication", "Division", "Exponentiation", "Logarithm"]
        },
        {
            type: "number",
            name: "num1",
            message: "Enter the first number: "
        },
        {
            type: "number",
            name: "num2",
            message: "Enter the second number: "
        }
    ]);
    if (answers.operator == "Addition") {
        console.log(chalk.green(`${answers.num1} + ${answers.num2} = ${answers.num1 + answers.num2}`));
    }
    else if (answers.operator == "Subtraction") {
        console.log(chalk.green(`${answers.num1} - ${answers.num2} = ${answers.num1 - answers.num2}`));
    }
    else if (answers.operator == "Multiplication") {
        console.log(chalk.green(`${answers.num1} * ${answers.num2} = ${answers.num1 * answers.num2}`));
    }
    else if (answers.operator == "Division") {
        console.log(chalk.green(`${answers.num1} / ${answers.num2} = ${answers.num1 / answers.num2}`));
    }
    else if (answers.operator === "Exponentiation") {
        console.log(chalk.green(`${answers.num1} ^ ${answers.num2} = ${Math.pow(answers.num1, answers.num2)}`));
    }
    else if (answers.operator === "Logarithm") {
        console.log(chalk.green(`log(${answers.num1}) base ${answers.num2} = ${Math.log(answers.num1) / Math.log(answers.num2)}`));
    }
}
async function startAgain() {
    do {
        await askQuestion();
        var again = await inquirer
            .prompt({
            type: "input",
            name: "restart",
            message: "Do you want to continue? Press y or n: "
        });
        if (again.restart.toLowerCase() === 'n' || again.restart.toLowerCase() === 'no') {
            goodbye();
        }
    } while (again.restart.toLowerCase() === 'y' || again.restart.toLowerCase() === 'yes');
}
function goodbye() {
    console.log(chalk.yellow('Goodbye! Take it easy, greasy! You’ve got a long way to slide...'));
    process.exit();
}
startAgain();
