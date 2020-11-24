const chalk=require("chalk")
const fs=require("fs")

const getNotes=()=>'Your notes';


const addNotes=(title,body)=>{
    const notes=loadNotes();
    const duplicateNotes=notes.filter((note)=>note.title===title);

    if(duplicateNotes.length===0){
        notes.push({
            title:title,
            body:body
        });
    
        saveNotes(notes);
        console.log(chalk.inverse.green("New note added"));
    }
    else{
        console.log(chalk.inverse.red("Note title taken"));
    }
    

}

const saveNotes=(notes)=>{
    const dataJSON=JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes=()=>{
    try{
        const dataBuffer=fs.readFileSync("notes.json");
    const dataJSON=dataBuffer.toString();
    return JSON.parse(dataJSON);
    }
    catch(e){
        return []
    }
}

const removeNotes=(title)=>{
    const notes=loadNotes();
    const notesToKeep=notes.filter((note)=>note.title!==title);
    if (notesToKeep.length===notes.length){
        console.log(chalk.red.inverse("No note found!"));
    }
    else{
        console.log(chalk.green.inverse("Note removed!"));
        saveNotes(notesToKeep);
    }   
}

const listNotes=()=>{
    const notes=loadNotes();
    console.log("Your notes:");
    for(let i=0;i<notes.length;i++){
        console.log(chalk.blue(notes[i].title));
    }
}

const readNote=(title)=>{
     const notes=loadNotes();
     flag=0;
     for(let i=0;i<notes.length;i++){
         if (notes[i].title===title){
            flag=1;
            console.log("Title:"+notes[i].title);
            console.log("Body: "+notes[i].body);
            break;
         }
     }
     if(flag===0)
         console.log("No note found");
}

module.exports ={
    getNotes:getNotes,
    addNotes:addNotes,
    removeNotes:removeNotes,
    listNotes:listNotes,
    readNote:readNote
}