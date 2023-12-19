import { insertToDB, saveDB, getDB } from "./db.js";
import * as readline from 'node:readline';
import { printListOfNotes } from "./utils/viewhelpers.js";


export const createNote = async (note, tags) => {
    const newNote = {
        tags,
        id: Date.now(),
        content: note,
    }
    await insertToDB(newNote, 'notes')
    return newNote
}

export const getAllNotes = async () => {
   const {notes} = await getDB()
    return notes
}

export const filterNotes = async (query) => {
    let output = []
    const notes = await getAllNotes()
    console.log({'all notes: ': notes});
    notes.forEach((note) => {
        if (note.content.toLowerCase().includes(query.toLowerCase()))
        {
            output.push(note);
        }
    })
    return output;
}

export const removeNoteById = async (id) => {
    let db = await getDB();
    for (const [index, note] of db.notes.entries()) //using for of so i can use await
    {
        if (note.id === id)
        {
            const removed = note;
            db.notes.splice(index, 1);
            await saveDB(db);
            return removed;
        }
    }
    return null
}

export const getNoteById = async (id) => {
    let db = await getDB();
    
    for (const [index, note] of db.notes.entries()) //using for of so i can use await
    {
        if (note.id === id)
        {
            return note
        }
    }
    return null;

}

export const replaceNote = async (id, content) => {
    let db = await getDB();
    // if (!db.notes.some(note => note.id === id))
    // {
    //     return null
    // }

    for (const [index, note] of db.notes.entries()) //using for of so i can use await
    {
        if (note.id === id)
        {
            note.content = content;
            await saveDB(db);
            return true;
        }
    }
    return false;
}

export const editNoteById = async (id) => {
    let note = await getNoteById(id);
    if (note === null)
    {
        return console.log('Note not found')
    }
    console.log(note);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.question('Enter Replacement Content: \n\n', (content) => {
        if (!content)
        {
            console.log('Replacement must not be empty')
            rl.close()
            return
        }
    if (replaceNote(id, content)) {
        console.log('Successfully Edited');
        rl.close()
        return
    }
    else {
        console.log('Failed to edit');
        rl.close()
        return;
    }
    })
}
   

export const removeAllNotes = async () => {
    saveDB({notes: []})
}