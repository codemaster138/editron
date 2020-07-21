const path = require('path');

const TYPES = {
    'javascript': [
        '.js',
        '.jsx',
        '.mjs'
    ],
    'html': [
        '.html',
        '.htm'
    ],
    'scss': [
        '.scss'
    ],
    'css': [
        '.css'
    ],
    'sass': [
        '.sass'
    ],
    'python': [
        '.py'
    ],
    'markdown': [
        '.md'
    ],
    'json': [
        '.json'
    ],
    'plaintext': [
        '.txt'
    ]
}

function findOne(obj, toFind) {
    console.log(toFind);
    for (key in obj) {
        if (obj[key] === toFind || obj[key].includes(toFind)) {
            return key;
        }
    }
    return undefined;
}

function codetype(file) {
    console.log(findOne(TYPES, path.extname(file || '_.txt')));
    return findOne(TYPES, path.extname(file || '_.txt') || 'txt' /* Use txt extension by default */) || 'plaintext' // Return plaintext by default 
}
module.exports = codetype;