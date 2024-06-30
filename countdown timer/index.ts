#! /usr/bin/env node
import boxen from "boxen";
import chalk from "chalk";
import { clear } from "console";
import { differenceInMilliseconds } from "date-fns";
import inquirer from "inquirer";

class CountDownTimer {
  private endDate: string = "";

  private getTimeDifference() {
    const dateNow = new Date();

    let difference = differenceInMilliseconds(this.endDate, dateNow);

    if (difference < 0) {
      this.timeUp();
      return;
    } else {
      const seconds: number = Math.floor(difference / 1000);
      const minutes: number = Math.floor(seconds / 60);
      const hours: number = Math.floor(minutes / 60);
      const days: number = Math.floor(hours / 24);
      const remainingHours: number = Math.floor(hours % 24);
      const remainingMinutes: number = Math.floor(minutes % 60);
      const remainingSeconds: number = Math.floor(seconds % 60);

      const dynamicCountdown = ` ${chalk.magenta.bold(
        days
      )} Days | ${chalk.green.bold(remainingHours)} Hours | ${chalk.blue.bold(
        remainingMinutes
      )} Minutes | ${chalk.red.bold(remainingSeconds)} Seconds `;

      clear();

      console.log(
        boxen(
          `
${chalk.green.bold("Your Time Starts Now!")}
${boxen(dynamicCountdown)}
      `,
          {
            title: "Countdown Timer",
            margin: 1,
            borderStyle: "double",
            borderColor: "magenta",
            padding: 1,
            titleAlignment: "center",
            textAlignment: "center",
          }
        )
      );
    }
  }

  private startCountDown() {
    setInterval(() => {
      this.getTimeDifference();
    }, 1000);
  }

  public async getCountdownDate() {
    const userInput = await inquirer.prompt([
      {
        name: "userDate",
        type: "input",
        message: `Enter your Countdown Ending Date in this form --> ${chalk.bold.magenta(
          `12 March 2024 12:00:00 PM`
        )}: `,
      },
    ]);

    this.endDate = userInput.userDate;
    this.startCountDown();
  }

  private timeUp() {
    clear();

    console.log(
      boxen(
        `
${chalk.red.bold("Time's up!")}
      `,
        {
          title: "Countdown Timer",
          margin: 1,
          borderStyle: "double",
          borderColor: "magenta",
          padding: 1,
          titleAlignment: "center",
          textAlignment: "center",
        }
      )
    );
  }
}

const myCountDown = new CountDownTimer();
myCountDown.getCountdownDate();