const chalk = require('chalk');
const yargs = require('yargs');
// type node app.js add --title="this is title"

const NoteUtility = require('./notes');
//Create command add
yargs.command({
    command:"add",
    describe : "Add a note",
    builder : {
        title : {
            describe : "Add title note",
            demandOption : true,
            type : 'string',
        },
        body : {
            describe : "Add body note",
            demandOption : true,
   
        }
    },
    handler(argv){
        NoteUtility.addNotes(argv.title, argv.body);
        //console.log('add',argv.title, argv.body);
    }
})

//Create command remove
yargs.command({
    command:"remove",
    describe : "remove a note",
    builder:{
        title : {
                 describe : "Remove a Note",
                demandOption : true,
                type : 'string',
        }
   
    },
    handler(argv){
        NoteUtility.removeNote(argv.title);
    }
})
//Create command list
yargs.command({
    command:"list",
    describe : "list out all notes",
    handler(){
        NoteUtility.listNotes();
    }
})
//Create command read
yargs.command({
    command:"read",
    describe : "read all notes",
    builder: {
        title: { // title can change other name
            describe: "READ NOTE !!",
            demandOption : true, // Require have to --title property. Default : false
            type: "string", // enforce --title is string.
        },
    },
    handler(argv){
        NoteUtility.readNote(argv.title)
    }
})
yargs.parse();
//console.log(yargs.argv);

//type : node app.js read --title="READ"
