#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";


const sleep = (ms: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};

let animationTitle = chalkAnimation.neon("\n 𝔖𝔱𝔞𝔶 𝔬𝔯𝔤𝔞𝔫𝔦𝔷𝔢𝔡, 𝔣𝔬𝔠𝔲𝔰𝔢𝔡, 𝔞𝔫𝔡 𝔭𝔯𝔬𝔡𝔲𝔠𝔱𝔦𝔳𝔢 𝔴𝔦𝔱𝔥 𝔱𝔥𝔢 𝔗𝔬-𝔇𝔬 𝔏𝔦𝔰𝔱...!!");

await sleep(3000);
animationTitle.stop();

console.log(chalk.yellow(`

⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿

📝 **To-Do List**
`));

// Define a variable to store the user's score

let score: number = 0;
let tasks: string[] = [];
const reminders: { reminder: string; dueDate: string; }[] = [];

async function main() {
  while (true) {
    const { task } = await inquirer.prompt([
      {
        type: 'input',
        name: 'task',
        message: 'Enter a task (or press enter to exit):',
      },
    ]);

    if (!task) {
      break;
    }

    tasks.push(task);
    console.log(chalk.green('Task added!'));

    // Increase the score when a task is added
    score += 10;
    console.log(chalk.blue(`Your score: ${score}`));

    const { reminder, dueDate } = await inquirer.prompt([
      {
        type: 'input',
        name: 'reminder',
        message: 'Enter a reminder:',
      },
      {
        type: 'input',
        name: 'dueDate',
        message: 'Enter the due date:',
      },
    ]);

    reminders.push({ reminder, dueDate });
    console.log(chalk.green('Reminder added!'));
  }

  console.log(chalk.yellow('\nYour To-Do List:'));
  tasks.forEach((task, index) => {
    console.log(chalk.blue(`☐ ${index + 1}. ${task}`));
  });

  console.log(chalk.black('\nYour Reminders:'));
  reminders.forEach((reminder, index) => {
    console.log(chalk.magenta(`🔔 ${index + 1}. ${reminder.reminder} (Due: ${reminder.dueDate})`));
  });

  if (score >= 40) {
    console.log(chalk.green('\n 🏆 Congratulations! You earned a badge for completing tasks.'));
  } else {
    console.log(chalk.red('\n"Ҡҽҽք ąժժìղց էąʂҟʂ էօ վօմɾ էօ-ժօ Ӏìʂէ ąղժ ҽąɾղìղց էհօʂҽ աҽӀӀ-ժҽʂҽɾѵժ ɾҽաąɾժʂ!"'));
  }
}

main();
