export const listNotes = (notes) => {
    notes.forEach(({id, content, tags}) => {
        let item = {
            'id:': id,
            'content:': content,
            'tags:': tags
        }
        console.log(item, '\n');
    })
}