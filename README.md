# DevLogger CLI

> A powerful command-line tool for developers to log, track, and manage their daily development activities directly from the terminal.

## 🎯 Problem Statement

As developers, we often juggle multiple projects, features, and tasks throughout the day. Traditional note-taking methods require context switching away from the terminal, breaking our workflow. DevLogger CLI solves this by providing instant logging capabilities right in your development environment.

## ✨ Key Features

- **Instant Logging**: Capture development activities with a single command
- **Project Organization**: Group logs by projects for better tracking
- **Flexible Filtering**: View logs by date, project, or combination
- **Local Storage**: JSON-based storage with no external dependencies
- **Terminal Integration**: Works seamlessly in your existing workflow
- **Colored Output**: Enhanced readability with chalk-based formatting
- **Cross-Platform**: Runs on Windows, macOS, and Linux

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Data Storage](#data-storage)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Installation

### Prerequisites

- **Node.js**: Version 14.0.0 or higher
- **npm**: Usually comes with Node.js

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/devlogger-cli.git
   cd devlogger-cli
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **(Optional) Global installation**
   ```bash
   npm link
   ```
   This allows you to use `devlogger` from anywhere in your system.

### Verification

Test the installation:
```bash
node devlogger.js --version
# or if globally linked:
devlogger --version
```

## 🏃 Quick Start

1. Log your first activity:
   ```bash
   devlogger log "Started working on user authentication"
   ```

2. View your logs:
   ```bash
   devlogger view
   ```

3. Log with a project:
   ```bash
   devlogger log "Implemented JWT tokens" --project auth-system
   ```

That's it! You're ready to track your development activities.

## 📖 Usage

### Command Structure

```
devlogger [options] [command]
```

### Global Options

- `-V, --version`: Display version number
- `-h, --help`: Display help information

### Commands

#### `log <message>`

Log a development activity.

**Syntax:**
```bash
devlogger log <message> [--project <project-name>]
```

**Options:**
- `-p, --project <name>`: Associate the log with a specific project

**Examples:**
```bash
# Simple log
devlogger log "Fixed CSS styling issues"

# Log with project
devlogger log "Updated database schema" --project ecommerce-api

# Log complex task
devlogger log "Refactored authentication middleware to use async/await pattern"
```

#### `view`

Display logged activities with filtering options.

**Syntax:**
```bash
devlogger view [--project <name>] [--date <YYYY-MM-DD>]
```

**Options:**
- `-p, --project <name>`: Filter logs by project
- `-d, --date <date>`: Filter logs by specific date (YYYY-MM-DD format)

**Examples:**
```bash
# View all logs
devlogger view

# View logs for a project
devlogger view --project frontend

# View logs for today
devlogger view --date 2026-03-06

# Combine filters
devlogger view --project backend --date 2026-03-05
```

#### `today`

Display all logs for the current day.

**Syntax:**
```bash
devlogger today
```

**Example:**
```bash
devlogger today
# Output: Shows all activities logged today
```

#### `project <name>`

Display all logs associated with a specific project.

**Syntax:**
```bash
devlogger project <project-name>
```

**Examples:**
```bash
devlogger project mobile-app
devlogger project data-pipeline
```

### Running Locally vs Globally

**Local execution:**
```bash
node devlogger.js log "Your message"
node devlogger.js view
```

**Global execution (after `npm link`):**
```bash
devlogger log "Your message"
devlogger view
```

## 💾 Data Storage

### Storage Format

DevLogger uses a simple JSON file (`devlogs.json`) stored in the current working directory. The structure is:

```json
{
  "logs": [
    {
      "id": 1643723400000,
      "message": "Implemented user authentication",
      "project": "auth-system",
      "date": "2026-03-06",
      "timestamp": "2026-03-06T10:30:00.000Z"
    }
  ]
}
```

### File Location

- **Default**: `./devlogs.json` (current directory)
- **Global usage**: Logs are stored relative to where you run the command

### Backup and Migration

To backup your logs:
```bash
cp devlogs.json devlogs-backup.json
```

To migrate logs between projects:
```bash
cp devlogs.json /path/to/other/project/
```

### Data Integrity

- Each log entry has a unique ID (timestamp-based)
- Data is validated before saving
- File corruption is handled gracefully with error messages

## ⚙️ Configuration

DevLogger is designed to be zero-config. However, you can customize behavior through:

### Environment Variables

- `DEVLOGGER_FILE`: Custom path for the logs file (default: `./devlogs.json`)

### Project-Specific Logs

Run DevLogger in different directories to maintain separate log files per project:

```bash
# Project A logs
cd ~/projects/project-a
devlogger log "Working on feature X"

# Project B logs (separate file)
cd ~/projects/project-b
devlogger log "Working on feature Y"
```

## 📚 Examples

### Daily Workflow

```bash
# Morning standup
devlogger log "Planning sprint tasks" --project web-app

# Throughout the day
devlogger log "Implemented responsive navigation" --project web-app
devlogger log "Fixed mobile layout issues" --project web-app
devlogger log "Code review for PR #123" --project web-app

# End of day review
devlogger today
```

### Project Tracking

```bash
# Start new project
devlogger log "Initialized React project with TypeScript" --project blog-site

# Development phases
devlogger log "Created basic component structure" --project blog-site
devlogger log "Implemented routing with React Router" --project blog-site
devlogger log "Added Markdown support for posts" --project blog-site

# Review project progress
devlogger project blog-site
```

### Sprint Planning

```bash
# Week planning
devlogger log "Sprint planning: User auth, payment integration" --project ecommerce

# Daily tracking
devlogger log "Completed user registration flow" --project ecommerce
devlogger log "Started payment gateway integration" --project ecommerce

# Sprint review
devlogger view --project ecommerce --date 2026-03-01
```

## 🔧 Troubleshooting

### Common Issues

#### "Cannot find module" Error

**Problem:** Running `devlogger` without global installation.

**Solution:**
```bash
# Use local execution
node devlogger.js log "Your message"

# Or install globally
npm link
```

#### No Logs Found

**Problem:** `devlogger view` shows no results.

**Solutions:**
- Check if you're in the correct directory (logs are stored per directory)
- Verify the `devlogs.json` file exists: `ls devlogs.json`
- Ensure you've logged activities first

#### Permission Errors

**Problem:** Cannot write to `devlogs.json`.

**Solutions:**
- Check directory permissions: `ls -la`
- Run with appropriate permissions
- Use a different directory with write access

#### Date Format Issues

**Problem:** Date filtering not working.

**Solution:** Use YYYY-MM-DD format:
```bash
devlogger view --date 2026-03-06  # Correct
devlogger view --date 03/06/2026  # Incorrect
```

### Debug Mode

For additional debugging information, check the console output or examine the JSON file directly:

```bash
cat devlogs.json | jq '.logs | length'  # Count total logs
```

### Getting Help

```bash
devlogger --help
devlogger log --help
devlogger view --help
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/yourusername/devlogger-cli.git
cd devlogger-cli
npm install
npm test  # Run tests
npm run lint  # Check code style
```

### Code Structure

- `bin/devlogger.js`: Main CLI application
- `package.json`: Project configuration
- `README.md`: This documentation
- `devlogs.json`: Log data storage (created automatically)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Commander.js](https://github.com/tj/commander.js) for CLI parsing
- Colored output powered by [Chalk](https://github.com/chalk/chalk)
- Inspired by the need for better developer productivity tools

---

**Happy logging!** Keep track of your development journey with DevLogger CLI.

---

Built with ❤️ by Aaron Tetteh  
Contact: [taaron@st.ug.edu.gh]