const fs = require('fs');
const status = require('./status');
const _ = require('lodash');

let fetchNotes = () => {
    try {
        let noteString = fs.readFileSync('list-data.json');
        return JSON.parse(noteString);
    } catch (e) {
        return [];
    }
}

let saveNotes = (lists) => {
    fs.writeFileSync('list-data.json', JSON.stringify(lists));
}
// function to add notes to file
let addNote = (title, body) => {

    let lists = fetchNotes();
    let note = {
        title,
        body
    };

    let duplicateNotes = lists.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        lists.push(note);
        saveNotes(lists);

        status.success('Note Created!');
        console.log("=====")
        status.item('Title', note.title);
        status.item('Body', note.body);

        return note;
    } else {
        status.failed('Note Already Exists!');
    }
};

// function to get all list from file
let getAll = () => {
    // console.log('Getting All Notes');
    let fetchedNotes = fetchNotes();
    if (_.isEmpty(fetchedNotes) === false) {
        status.processing(`Fetching ${fetchedNotes.length} note(s).`);

        status.success(`   Note Title\tNote Body  \n`.bgWhite.black);

        fetchedNotes.map((note, index) => {
            status.display(`${index + 1}: ${note.title}\t\t${note.body}`);
        })
    } else {
        status.failed('Failed to Get Note!')
    }
};

// function to get a single list from file
let getNote = (title) => {
    // console.log('Reading Note: ',title);
    let notes = fetchNotes();
    let filteredNote = notes.filter((note) => note.title === title);
    if (filteredNote.length <= 1) {
        try {
            let note = filteredNote[0];
            console.log("=====")
            status.item('Title', note.title);
            status.item('Body', note.body);
        } catch (e) {
            status.failed("Note Not Found!");
        }
    } else {
        status.failed("Note Not Found!");
    }

};

// function to delete a note
let removeNote = (title) => {
    let notes = fetchNotes();
    let filteredNote = notes.filter((note) => note.title !== title);
    saveNotes(filteredNote);

    if (notes.length === filteredNote.length) {
        status.failed('Note Was Not Deleted!...Please Check Your Command And Try Again');
    } else {
        status.success('Note Successfully Deleted!');
    }
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};