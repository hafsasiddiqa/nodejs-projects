#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";


const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

let animationTitle = chalkAnimation.rainbow("\n చҽӀçօʍҽ էօ the Ⱥէʍ... 🏦");

await sleep(3000);
animationTitle.stop();
const atmArt = `
  
   _______
 /  ATM   \\
|   _   _  |
|  |💰|💳| |
|  |❌|🚫| |
\\     🚬  / 
  --------
`;

console.log(chalk.green(atmArt));
 
const users: { id: string; pin: string; balance: number }[] = [
  { id: '123', pin: '555', balance: 1000 },
  { id: '545', pin: '222', balance: 500 },
];

function login() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'id',
        message: '\n Enter your ID:\n',
      },
      {
        type: 'password',
        name: 'pin',
        message: '\n Enter your PIN:\n',
        mask: '*',
      },
    ])
    .then((answers) => {
      const user = users.find((u) => u.id === answers.id && u.pin === answers.pin);
      if (user) {
        console.log(chalk.green('\n Login successful!'));
        showMenu(user);
      } else {
        console.log(chalk.red('Invalid ID or PIN. Please try again.'));
        login();
      }
    });
}

function showMenu(user: { id: string; pin: string; balance: number }) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        message: 'Choose an option:',
        choices: ['Check Balance', 'Withdraw', 'Exit'],
      },
    ])
    .then((answers) => {
      switch (answers.option) {
        case 'Check Balance':
          console.log(chalk.blue(`💸 Your balance is $${user.balance}\n`));
          showMenu(user);
          break;
        case 'Withdraw':
          withdraw(user);
          break;
        case 'Exit':
          console.log(chalk.magenta('\n  𝑻𝒉𝒂𝒏𝒌 𝒚𝒐𝒖 𝒇𝒐𝒓 𝒖𝒔𝒊𝒏𝒈 𝒐𝒖𝒓 𝑨𝑻𝑴. 𝑮𝒐𝒐𝒅𝒃𝒚𝒆 n tAke cArE...'));
          break;
      }
    });
}

function withdraw(user: { id: string; pin: string; balance: number }) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'amount',
        message: 'Enter the amount to withdraw:',
        validate: (value) => {
          const amount = parseFloat(value);
          if (isNaN(amount) || amount <= 0) {
            return 'Please enter a valid amount.';
          } else if (amount > user.balance) {
            return 'Insufficient funds.';
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      const amount = parseFloat(answers.amount);
      user.balance -= amount;
      console.log(chalk.green(` 💳➡💶 Successfully withdraw $${amount}.\n`));
      showMenu(user);
    });
}

login();


