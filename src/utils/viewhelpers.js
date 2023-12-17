export const printListOfNotes = (notes) => {
    if (notes.length === 0) {
        return console.log('\nNo Notes Yet! Make one with note new <your text here>\n')
    }
    notes.forEach(({id, content, tags}) => {
        let item = {
            'id:': id,
            'content:': content,
            'tags:': tags
        }
        console.log(item, '\n');
    })
}

export const printEraseMessage = () => {
    console.log('\n');
    console.log('----------------------------------------');
    console.log('');
    console.log('   Database erased successfully.      ');
    console.log('');
    console.log('----------------------------------------');
    console.log('\n');

}