const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const colors = require('colors');
const status = require('./status');

// status.processing('Starting app.js!'.bold);

const list = require('./list.js');

const bodyOptions = {
    describe: 'Body of Note',
    demand: true,
    alias: 'b'
}

const showTitleOptions = (extra = '') => {
    return titleOptions = {
        describe: 'Title of Note ' + extra,
        demand: true,
        alias: 't'
    }
}

const argv = yargs

.command('add', 'Add a New Note', {
    title: showTitleOptions(),
    body: bodyOptions
})
.command('delete', 'Delete a Note', {
    title: showTitleOptions('to be Deleted')
})
.command('read', 'Display New Note', {
    title: showTitleOptions('to be Displayed')
})
.command('list', 'List All Notes')
.help()
.argv;

let command = argv._[0].toLowerCase();

switch (command) {
    case 'add':
        let note = list.addNote(argv.title, argv.body);
        break;
    case 'list':
        list.getAll();
        break;
    case 'read':
        list.getNote(argv.title);
        break;
    case 'delete':
        list.removeNote(argv.title)
        break;
    default:
        console.log('Command Not Recognized'.underline.bgRed.white);
}