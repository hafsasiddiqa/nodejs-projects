#! /usr/bin/env node
import  inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import boxen from 'boxen';

  async function welcomeScreen() {
      const startingAnimation = chalkAnimation.rainbow(
          boxen(
              `\n
              𝖂𝖊𝖑𝖈𝖔𝖒𝖊 𝖙𝖔 𝖙𝖍𝖊 ⤹★ 𝖙𝖗𝖎𝖛𝖎𝖆 𝖖𝖚𝖎𝖟 𝖆𝖕𝖕! ★⤸  
              ╔═══════════════════════════════════════════╗
              ║                                           ║
              ║   /\_/\                                  ║
              ║  ( o.o )  Welcome to the Trivia Quiz App!  ║
              ║   > ^ <                                  ║
              ║                                           ║
              ╚═══════════════════════════════════════════╝       
              
       \n `, 
              {
                  title: "Trivia Quiz App",
                  titleAlignment: "center",
                  borderStyle: "classic",
                  float: "left",
             }
           )
      );
      await new Promise(resolve => setTimeout(resolve, 2000));
      startingAnimation.stop();
  }
  await welcomeScreen();

interface Question {
  question: string;
  answers: {
    value: string;
    correct: boolean;
  }[];
}

const questions: Question[] = [
  {
    question: '\nWhy do some people get goosebumps when they\'re scared or excited?\n',
    answers: [
      { value: 'To protect the skin from cold or injury', correct: true },
      { value: 'To increase blood flow to the skin', correct: false },
      { value: 'To release toxins from the skin', correct: false },
      { value: 'To improve vision', correct: false },
    ],
  },
  {
    question: '\nWhat country drinks the most coffee?\n',
    answers: [
      { value: 'Pakistan', correct: false },
      { value: 'Finland', correct: true },
      { value: 'America', correct: false },
      { value: 'United Kingdom', correct: false },
    ],
  },
  {
    question: '\nWhat is the name of the purring sound that cats make?\n',
    answers: [
      { value: 'Chatter', correct: false },
      { value: 'Chirr', correct: false },
      { value: 'Trill', correct: false },
      { value: 'Purr', correct: true },
    ],
  },
  {
    question: '\nWhy is the sky blue?\n',
    answers: [
      { value: 'Because of the reflection of sunlight off the ocean', correct: false },
      { value: 'Because of the scattering of sunlight by the atmosphere', correct: true },
      { value: 'Because of the absorption of sunlight by the ozone layer', correct: false },
      { value: 'Because of the refraction of sunlight by the Earth', correct: false },
    ],
  },
  {
    question: '\nWhat is the tallest type of tree?\n',
    answers: [
      { value: 'Sweet Acacia', correct: false },
      { value: 'Redwoods', correct: true },
      { value: 'Fragrant Lilac', correct: false },
      { value: 'Japanese Red Maple', correct: false },
    ],
  },
  {
    question: '\nWhich cat breed is known for its curly ears and curly coat?\n',
    answers: [
      { value: 'Devon Rex', correct: true },
      { value: 'Cornish Rex', correct: false },
      { value: 'Selkirk Rex', correct: false },
      { value: 'LaPerm', correct: false },
    ],
  },
  {
    question: '\n Pink Ladies and Granny Smiths are types of what fruit?\n',
    answers: [
      { value: 'Apples', correct: true },
      { value: 'Papaya', correct: false },
      { value: 'Banana', correct: false },
      { value: 'Kiwi', correct: false },
    ],
  },
  {
    question: '\nWhich of the following is NOT a reason why cats knead?\n',
    answers: [
      { value: 'To make a soft, comfortable place to lie down', correct: false },
      { value: 'To mark their territory', correct: true },
      { value: 'To show affection', correct: false },
      { value: 'To make biscuits', correct: false },
    ],
  },
  {
    question: '\n Why do we get butterflies in our stomach?\n',
    answers: [
      { value: 'Because of the release of adrenaline', correct: true },
      { value: 'Because of a lack of food', correct: false },
      { value: 'Because of a viral infection', correct: false },
      { value: 'Because of a lack of water', correct: false },
    ],
  },
  {
    question: '\n Why do we hiccup?\n',
    answers: [
      { value: 'Because of a sudden contraction of the diaphragm', correct: true },
      { value: 'Because of a blockage in the digestive tract', correct: false },
      { value: 'Because of dehydration', correct: false },
      { value: 'Because of stress', correct: false },
    ],
  },
];
async function runQuiz() {
  let playAgain = true;
  
  while (playAgain) {
  console.log(chalk.yellow('\nYou will be asked 10 questions. Good luck!\n'));

  let score = 0;
  let correctAnswers = [];
  for (const question of questions) {
    const answer = await inquirer.prompt([{ 
        type: 'list', 
        name: 'selectedAnswer',
        message: question.question,
        choices: question.answers.map((a) => a.value),
    }]);

    const correctAnswer = question.answers.find((a) => a.correct)?.value;
    if (answer.selectedAnswer === correctAnswer) { 
      score++; 
    } else {
      correctAnswers.push({question: question.question, correctAnswer: correctAnswer});
    }
  }

  console.log(boxen(chalk.magenta(`\n You got ${score} out of ${questions.length} correct!\n`)));

  if (correctAnswers.length > 0) {
    console.log(chalk.red('\nHere are the correct answers for the questions you missed:\n'));
    correctAnswers.forEach((item, index) => {
      console.log(chalk.blue(`Question ${index + 1}: ${item.question}`));
      console.log(chalk.green(`Correct Answer: ${item.correctAnswer}\n`));
    });
  }
  const playAgainAnswer = await inquirer.prompt([{
    type: 'confirm',
    name: 'playAgain',
    message: 'Do you want to take the quiz again?\n',
  }]);
  playAgain = playAgainAnswer.playAgain;
  console.log(chalk.magenta('ThAnK YoU FoR TaKiNg ThE TrIviA QuIz... HaVe A GoOd DaY!!'));
}
}
runQuiz();

