# CLI Notetaker

CLI Notetaker lets you write and save notes from the command line.

## Installation

 - Clone this Repo
```bash
git clone git@github.com:shellycs50/cli_notetaker.git
```
- Run npm install to get dependencies

```bash
npm install
```
- Run npm link to install.
```bash
npm link
```
- If you'd like to use another word, you can change it in package.json

```js
{
  "name": "cli_notetaker",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "bin": {
    "note": "./index.js"             //change note to whichever word you would like to use
  },
```


## Usage

- Create a note (with optional tag flag)
```
# Make a new note
note new 'testnote'--tags 'This is a test, notetime!, 2023'

