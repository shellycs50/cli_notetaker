#!/usr/bin/env node

// const note = process.argv.slice(2).join(' ');
const note = process.argv[2];
const newNote = {
    content: note,
    id: Date.now(),
}
console.log(newNote);
