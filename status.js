const colors = require('colors');

// show success message
let success = (msg) => {
    console.log(`${msg} `.bgGreen.black);
}

// show error message
let failed = (msg) => {
    console.warn(`${msg} ☹️ `.bgRed.white);
}

// show item such as note title
let item = (header = '', item) => {
    console.log(`${header}: ${item}`.bgCyan.black.underline);
}

// display
let display = (msg) => {
    console.warn(`${msg}`.bgCyan.black.underline);
}

// show processing code like 'deleting note'
let processing = (msg) => {
    console.log(`${msg} 🔄 `.bgMagenta.white);
}

module.exports = {
    success,
    failed,
    item,
    processing,
    display
};