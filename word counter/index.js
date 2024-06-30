#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
const sleep = (ms) => {
    return new Promise((res) => {
        setTimeout(res, ms);
    });
};
let animationTitle = chalkAnimation.rainbow("\n 𝐖𝒪𝖱𝖣 𝐶ο𐓶𝐧𝕥ⅇг: 𝝚𝜈𝛠ⲅყ 𝘞𝐨𝙧𝕕 𝒞𝚘𝘶𝙣𝒕𝚜 !! \n");
await sleep(2000);
animationTitle.stop();
const wordCounterPicture = `
   ╔════════════════════════╗
   ║                        ║
   ║    Word Count: 20      ║
   ║                        ║
   ║      _.-'''''-._       ║
   ║    .'  _     _  '.      ║
   ║   /   (_)   (_)  \\    ║
   ║  |  ,           ,|   ║
   ║   \\   - . . -   /    ║
   ║    '.         .'        ║
   ║      '-.....-'         ║
   ╚════════════════════════╝
`;
console.log(chalk.yellow(wordCounterPicture));
function countWords(paragraph, separator, wordGoal, activity) {
    const words = paragraph.split(separator);
    const filteredWords = words.filter(word => word !== '');
    const count = filteredWords.length;
    if (wordGoal !== undefined && count >= wordGoal) {
        console.log(chalk.green(`\n Word count: ${count}\n`));
        console.log(chalk.magenta(`\n Word goal achieved! 🏆 \n`));
    }
    else {
        console.log(chalk.red(`\n Word count: ${count}\n`));
    }
    if (activity) {
        console.log(chalk.blue(`\n Activity: ${activity}\n`));
    }
    return count;
}
function startCountingWords() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'paragraph',
            message: '\nEnter a paragraph to count the word: 📜 📝 \n',
        },
        {
            type: 'input',
            name: 'separator',
            message: '\nEnter the separator (default is space):\n',
            default: ' ',
        },
        {
            type: 'input',
            name: 'wordGoal',
            message: '\nEnter the word goal (optional): 🎯 \n',
        },
        {
            type: 'input',
            name: 'activity',
            message: '\nEnter the activity (optional): 🏋️‍♂️ \n',
        },
    ])
        .then((answers) => {
        const { paragraph, separator, wordGoal, activity } = answers;
        const parsedWordGoal = parseInt(wordGoal);
        const wordCount = countWords(paragraph, separator, parsedWordGoal, activity);
        inquirer
            .prompt([
            {
                type: 'confirm',
                name: 'startAgain',
                message: '\n Do you want to count words again? \n',
                default: true,
            },
        ])
            .then((answer) => {
            if (answer.startAgain) {
                startCountingWords();
            }
            else {
                console.log(chalk.yellow('\n Thank you for using the word counter...Goodbye! 🤗 \n'));
            }
        });
    });
}
startCountingWords();
