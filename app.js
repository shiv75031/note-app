const chalk=require("chalk");
const notes=require('./notes.js');
const yargs=require("yargs");
const { string } = require("yargs");
const { readNote } = require("./notes.js");

//Costumize version
yargs.version("1.1.0");


//add command
yargs.command({
    command:'add',
    describe:'Adding a note',
    builder:{
        title:{
            describe:"Note title",
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Note body',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title,argv.body);
    }
});

//remove command
yargs.command({
    command:'remove',
    describe:'Remove a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'

        }
    },
    handler(argv){
        notes.removeNotes(argv.title);
    }
});

//list command
yargs.command({
    command:'list',
    describe:'List out notes',
    handler(){
        notes.listNotes();
    }
});

//read command
yargs.command({
    command:'read',
    describe:'Reading the notes',
    handler(argv){
       notes.readNote(argv.title);
    }
});

//add,remove,read,list
yargs.parse();