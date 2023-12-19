import { jest } from '@jest/globals'

// stub out stuff we dont want to test, when doing unit tests. 

jest.unstable_mockModule('../src/db.js', () => ({
    getDB: jest.fn(),
    saveDB: jest.fn(),
    insertToDB: jest.fn(),
}));

const { getDB, saveDB, insertToDB } = await import ('../src/db.js')
const { createNote, getAllNotes, filterNotes, removeNoteById, removeAllNotes } = await import ('../src/notes.js')

//essentially a useEffect that is run before each test. 
beforeEach(() => {
    getDB.mockClear()
    saveDB.mockClear()
    insertToDB.mockClear()
})

describe('notes.js Unit Tests', () => {
    
    test('createNote adds newNote to db and returns a copy of the newNote object', async () => {
        const note = 'Test note'
        const tags = ['tag1', 'tag2']
        const data = {
            tags,
            id: Date.now(),
            content: note,
        };
        insertToDB.mockResolvedValue(data) //insertToDB is being mocked, so now when the mock is called it will return data. (note insertToDB doesnt return anything useful this is just for learning)
    
        const result = await createNote(note, tags)
        expect(result.tags).toEqual(data.tags)
        expect(result.id).toEqual(data.id)
        expect(result.content).toEqual(data.content)
        // expect(result).toEqual(data)
    
        // toEqual means == 
        // toBe means === 
    })

    test('getAllNotes returns the entire "notes" array from the provided database object', async () => {
        const db = {"notes": [{"tags": ["urgent","right now!!!"],"id": 1702849074899,"content": "I really need to turn the stove off"}]}
        const notes = db.notes
        getDB.mockResolvedValue(db);
        const result = await getAllNotes();
        expect(result).toEqual(notes)
    })
    
    test('filterNotes returns notes that contain a substring passed as a param', async () => {
        const db = {"notes": [{ "tags": ["urgent","right now!!!"],"id": 1702849074899,"content": "I really need to turn the stove off"},{"tags": ["we love you"],"id": 1702912386806,"content": "chitty chitty bang bang"}]}
        getDB.mockResolvedValue(db);
        const result = await filterNotes('bang')
        expect(result).toEqual([db.notes[1]])
    })
    
    test('removeNoteById returns the object that has been deleted from notes', async () => {
        const db = {"notes": [{ "tags": ["urgent","right now!!!"],"id": 1702849074899,"content": "I really need to turn the stove off"},{"tags": ["we love you"],"id": 1702912386806,"content": "chitty chitty bang bang"}]}
        const changed_Db = {"notes": [{ "tags": ["urgent","right now!!!"],"id": 1702849074899,"content": "I really need to turn the stove off"}]}
        const chitty = db.notes[1]
        getDB.mockResolvedValue(db)
        saveDB.mockResolvedValue(changed_Db)
        const result = await removeNoteById(1702912386806)
        expect(result).toEqual(chitty)
    })
    
    test('removeNote returns undefined for non existent id', async () => {
        const db = {"notes": [{ "tags": ["urgent","right now!!!"],"id": 1702849074899,"content": "I really need to turn the stove off"},{"tags": ["we love you"],"id": 1702912386806,"content": "chitty chitty bang bang"}]}
        getDB.mockResolvedValue(db)
        saveDB.mockResolvedValue(db)
        const result = await removeNoteById(999);
        expect(result).toEqual(null)
    })
})


