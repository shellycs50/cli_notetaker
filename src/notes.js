import { insertToDB, saveDB, getDB } from "./db.js";

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
    notes.forEach((note) => {
        if (note.content.toLowerCase().includes(query.toLowerCase()))
        {
            output.push(note);
        }
    })
    if (output.length === 0)
    {
        return "No matches"
    }
    return output;
}

export const removeNote = async (id) => {
    let db = await getDB();
    let newdb = db;
    for (const [index, note] of db.notes.entries()) //using for of so i can use await
    {
        if (note.id === id)
        {
            newdb = db.splice(index, 1);
            await saveDB(newdb);
            return `Note Deleted. (id: ${id})\n`
        }
    }
    return 'Note not found. No Changes made\n'
}

export const removeAllNotes = async () => {
    saveDB({notes: []})
}