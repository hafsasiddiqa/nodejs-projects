#! /usr/bin/env node
import chalk from "chalk";
import readline from 'readline';
import chalkAnimation from 'chalk-animation';

const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };
  
  let animationTitle = chalkAnimation.rainbow("\n Welcome to the ⤹★ Adventure Game ★⤸"); 
  await sleep(3000);
  animationTitle.stop();
  

class Scene {
    description: string;
    options: Option[];

    constructor(description: string, options: Option[]) {
        this.description = description;
        this.options = options;
    }
}

class Option {
    description: string;
    nextScene: string;
    type: 'continue' | 'exit'; 

    constructor(description: string, nextScene: string, type: 'continue' | 'exit') {
        this.description = description;
        this.nextScene = nextScene;
        this.type = type; 
    }
}
const scenes: { [key: string]: Scene } = {
    'start': new Scene(chalk.green('\n You are in a dark room. There is a door to your left and right.\n'), [
        new Option(chalk.red('\n Go through the left door.'), 'left', 'continue'),
        new Option(chalk.yellow('\n Go through the right door.'), 'right', 'continue'),
    ]),
    'left': new Scene(chalk.green('\n You are in a garden. There is a well in front of you.\n'), [
        new Option(chalk.blue('\n Go to the well.'), 'well', 'continue'),
        new Option(chalk.magenta('\n Go back to the room.'), 'start', 'continue')
    ]),
    'right': new Scene(chalk.green('\n You are in a library. There is a bookshelf with a book on top. \n'), [
        new Option(chalk.yellow('\n Take the book.'), 'book', 'continue'),
        new Option(chalk.blue('\n Go back to the room.'), 'start', 'continue')
    ]),
    'well': new Scene(chalk.magenta('\n You found a 💎 treasure chest! Congratulations!  \n'), []),
    'book': new Scene(chalk.blue('\n You found a 📚 magical tome! You can now cast spells! \n'), []),
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let currentScene = scenes['start'];

const gameLoop = () => {
    console.log(chalk.green(currentScene.description));
    if (currentScene.options.length === 0) {
        console.log(chalk.black('\n You have reached an endpoint in the game. Enter "exit" to quit or any other key to restart. \n'));
        rl.question('', (input) => {
            if (input.toLowerCase() === 'exit') {
                console.log(chalk.magenta('\n Have a good day... Goodbye! 🙂 \n')); 
                rl.close();
            } else {
                currentScene = scenes['start'];
                gameLoop();
            }
        });
    } else {
        currentScene.options.forEach((option, index) => {
            console.log(`${index + 1}. ${option.description}`);
        });

        rl.question(chalk.grey('\n Enter your choice: \n'), (choice) => {
            const selectedOption = currentScene.options[+choice - 1];
            if (selectedOption) {
                currentScene = scenes[selectedOption.nextScene];
                gameLoop();
            } else {
                console.log('Invalid choice. Please try again.');
                gameLoop();
            }
        });
    }
};

gameLoop();
