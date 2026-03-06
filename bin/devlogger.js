#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const program = new Command();

program
  .name('devlogger')
  .description('A command-line tool for developers to log and manage development activities')
  .version('1.0.0');

// Path to the logs file
const logsFile = path.join(process.cwd(), 'devlogs.json');

// Ensure logs file exists
if (!fs.existsSync(logsFile)) {
  fs.writeFileSync(logsFile, JSON.stringify({ logs: [] }, null, 2));
}

// Load logs
function loadLogs() {
  try {
    const data = fs.readFileSync(logsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(chalk.red('Error loading logs:'), error.message);
    return { logs: [] };
  }
}

// Save logs
function saveLogs(data) {
  try {
    fs.writeFileSync(logsFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(chalk.red('Error saving logs:'), error.message);
  }
}

// Log command
program
  .command('log <message>')
  .description('Log a development activity')
  .option('-p, --project <project>', 'Specify the project name')
  .action((message, options) => {
    const data = loadLogs();
    const logEntry = {
      id: Date.now(),
      message,
      project: options.project || 'default',
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString()
    };
    data.logs.push(logEntry);
    saveLogs(data);
    console.log(chalk.green('Logged:'), message);
  });

// View command
program
  .command('view')
  .description('View all logs')
  .option('-p, --project <project>', 'Filter by project')
  .option('-d, --date <date>', 'Filter by date (YYYY-MM-DD)')
  .action((options) => {
    const data = loadLogs();
    let logs = data.logs;

    if (options.project) {
      logs = logs.filter(log => log.project === options.project);
    }

    if (options.date) {
      logs = logs.filter(log => log.date === options.date);
    }

    if (logs.length === 0) {
      console.log(chalk.yellow('No logs found.'));
      return;
    }

    logs.forEach(log => {
      console.log(`${chalk.blue(log.date)} [${chalk.cyan(log.project)}]: ${log.message}`);
    });
  });

// Today command
program
  .command('today')
  .description('View logs for today')
  .action(() => {
    const today = new Date().toISOString().split('T')[0];
    const data = loadLogs();
    const logs = data.logs.filter(log => log.date === today);

    if (logs.length === 0) {
      console.log(chalk.yellow('No logs for today.'));
      return;
    }

    logs.forEach(log => {
      console.log(`[${chalk.cyan(log.project)}]: ${log.message}`);
    });
  });

// Project command
program
  .command('project <name>')
  .description('Set the current project or view project logs')
  .action((name) => {
    // For now, just view logs for the project
    const data = loadLogs();
    const logs = data.logs.filter(log => log.project === name);

    if (logs.length === 0) {
      console.log(chalk.yellow(`No logs for project "${name}".`));
      return;
    }

    console.log(chalk.green(`Logs for project "${name}":`));
    logs.forEach(log => {
      console.log(`${chalk.blue(log.date)}: ${log.message}`);
    });
  });

program.parse();