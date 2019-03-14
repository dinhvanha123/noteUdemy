const fs = require('fs');
const chalk = require('chalk');
const getNotes = ()=>{
    return 'Your notes ...';
}
const addNotes = (title,body) => {
    const notes = loadNotes();
    const duplicateNote = notes.filter((note)=>note.title == title)
    debugger
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
const removeNote  = function(title){
    const notes = loadNotes();
    const indexRemove = notes.filter(function(note){
        return note.title != title;
    })
    if(indexRemove.length === notes.length){
        console.log(chalk.red('No note is removed'));
    }else{
         fs.writeFileSync('notes.json',JSON.stringify(indexRemove));
         console.log(chalk.green('Remove note successfully !!'));
    }
   
}
const listNotes = ()=>{
   const listNotes = loadNotes();
   listNotes.forEach(note => {
       console.log(JSON.stringify(note)+" ");
       
   });
}
const readNote = (title)=>{
        const listNotes = loadNotes();
        const duplicateNote = listNotes.find((note)=>note.title === title) ;
        if(duplicateNote){
                console.log(chalk.green.inverse('Your note :'));
                console.log('Title :',duplicateNote.title);
                console.log('Body :',duplicateNote.body);
        }else{
            console.log(chalk.red.inverse('Not found'));
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
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote,
}