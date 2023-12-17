import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { createNote, getAllNotes, filterNotes, removeNoteById, removeAllNotes } from './notes.js'
import { printListOfNotes, printEraseMessage } from './utils/viewhelpers.js'

yargs(hideBin(process.argv))
  .command('new <note>', 'create a new note', yargs => {
    return yargs.positional('note', {
      describe: 'The content of the note you want to create',
      type: 'string'
    })
  }, async (argv) => {
    const tags = argv.tags ? argv.tags.split(',').map((tag) => tag.trim()) : [] //should be using regex instead of trim for efficiency but havent learned yet and out of scope for now.
    const note = await createNote(argv.note, tags)
    console.log({'New Note Added: ': note})
  })
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'
  })
  .command('all', 'get all notes', () => {}, async (argv) => {
    const notes = await getAllNotes()
    printListOfNotes(notes)
  })
  .command('find <filter>', 'get matching notes', yargs => {
    return yargs.positional('filter', {
      describe: 'The search term to filter notes by, will be applied to note.content',
      type: 'string'
    })
  }, async (argv) => {
    console.log(`Searching for ${argv.filter}`)
    const result = await filterNotes(argv.filter);
    result.length > 0 ? printListOfNotes(result) : console.log("No Matches");
  })
  .command('remove <id>', 'remove a note by id', yargs => {
    return yargs.positional('id', {
      type: 'number',
      description: 'The id of the note you want to remove'
    })
  }, async (argv) => {
    removeNoteById(argv.id)
  })
  .command('web [port]', 'launch website to see notes', yargs => {
    return yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000,
        type: 'number'
      })
  }, async (argv) => {
    
  })
  .command('clean', 'remove all notes', () => {}, async (argv) => {
    await removeAllNotes()
    return printEraseMessage();
  })
  .demandCommand(1)
  .parse()