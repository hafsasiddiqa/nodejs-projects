#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';


const sleep = (ms: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};

let animationTitle = chalkAnimation.karaoke("\n 𝗖𝐮𝓇𝙧𝘦𝓷𝗰ɣ 𐐕𝐨ոv𝔢гтҽｒ...!!");

await sleep(5500);
animationTitle.stop();

console.log(chalk.red('\n Convert ɣour moneɣ with ease and accuracɣ... 💶 💸  𝕽  𝖘 \n'));

const Conversion = {
  "PKR": {
    "USD": 0.004434589800443459,
    "EUR": 0.9250,
    "PKR": 1.24
  },
  "EUR": {
    "USD": 1.08,
    "PKR": 302.20,
    "EUR": 1
  },
  "USD": {
    "PKR": 279.65,
    "EUR": 0.93,
    "USD": 1
  }
}

let convertAgain: boolean = true;
while (convertAgain) {
  const answer: {
    from: "PKR" | "USD" | "EUR",
    to: "PKR" | "USD" | "EUR",
    amount: number
  } = await inquirer.prompt([
    {
      type: "list",
      name: "from",
      choices: ["PKR", "USD", "EUR"],
      message: "\n Select your currency 🇵 🇰  💶  💰:\n "
    },
    {
      type: "list",
      name: "to",
      choices: ["PKR", "USD", "EUR"],
      message: "\n Select your conversion currency 🇵 🇰  💶  💰:\n "
    },
    {
      type: "number",
      name: "amount",
      message: "\n Enter your conversion amount 🔢:\n "
    }
  ]);

  const { from, to, amount } = answer;

  if (from && to && amount) {
    let result = Conversion[from][to] * amount;
    console.log(chalk.magenta(`\n Your convertion from ${from} to ${to} is ${result} 💱 \n`));

  } else {
    console.log("Invalid inputs")
  }

  let { convertAgainAnswer }: { convertAgainAnswer: boolean } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'convertAgainAnswer',
      message: '\n Do you want to use converter again 🔄 ? (Yes/No)\n',
    },
  ]);

  convertAgain = convertAgainAnswer;

}

console.log(chalk.blue('\n THaNk yOu FoR uSinG ThE cUrReNcY ConVeRtEr...🙂'));
