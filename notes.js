const fs = require('fs');
const getNotes = function(){
    return 'Your notes ...';
}
const addNotes = function(title,body){
    const notes = loadNotes();
    const duplicateNote = notes.filter(function(note){
        return note.title == title;
    })
    if(duplicateNote.length === 0){
        notes.push({
            title: title,
            body: body,
        })
        fs.writeFileSync('notes.json', JSON.stringify(notes));
        console.log('Add note success !!');
    }else{
        console.log('Note is existed');
    }
 
}
const loadNotes = function(){
    try {
         const dataBuffer = fs.readFileSync('notes.json');
         const dataJSON = dataBuffer.toString();
         return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
   
}
module.exports = {
    getNotes : getNotes,
    addNotes : addNotes,
}