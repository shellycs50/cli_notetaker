import fs from 'node:fs/promises'
import dotenv from 'dotenv'
dotenv.config()
const DB_PATH = process.env.DB_PATH;

// get entire database (get all notes)
export const getDB = async () => {
    const db = await fs.readFile(DB_PATH, 'utf-8')
    //parse turns json string to json obj
    return JSON.parse(db)
}

// save database 
export const saveDB = async (db) => {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
    return db
}

//insert new note
export const insertToDB = async (input, index) => {
    const db = await getDB()

    if (index in db) {
        db[index].push(input)
        await saveDB(db)
        return console.log('Saved')
    }
    else 
    {
        return console.log(`Failed to find ${index} in db`)
    }
    
}