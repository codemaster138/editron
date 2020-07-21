/**
 * This module deals with files in Editron
 */
// IPC is used to communicate between main process and app
const { ipcRenderer: ipc } = require('electron'),
    fs = require('fs'),
    path = require('path');

const dialogger = require("./app/scripts/dialogger")(ipc),
    codeType = require('./app/scripts/codetype');

console.log('dialog module: ', dialogger);

// When the user clicks the 'New' menu item
ipc.on('NewFile', () => {
    app.tabs.createNewFile() // Create a new file
});

// When the user clicks the 'Save' menu item
ipc.on('SaveFile', () => {
    app.tabs.saveFile() // Save the file
})

// When the user clicks the 'Save as' menu item
ipc.on('SaveAs', () => {
    app.tabs.saveAs();
});

// When the user clicks the 'Open' menu item
ipc.on('OpenFile', () => {
    app.tabs.loadFile();
});

/**
 * Functions for creating, saving, deleting and managing files
 */

/**
 * Tab bar
 */

var app = app || {};
app.tabs = {
    files: JSON.parse(window.localStorage.getItem('files') || "[]"), // Keep track of open files
    curtab: 0, // Keep track of currently open tab
    /**
     * Displays all open files in the tab bar
     */
    renderTabBar() { // Show all files in the tab bar
        let tabbar = $('.tabbar')[0];
        tabbar.innerHTML = this.files.map((el, idx) => `
            <div class="tab" data-id="${idx}">${el.path ? path.basename(el.path || '') : 'New File'} <span class="close">&times;</span></div>
        `).join();
        this.applyListeners();
        this.setType();
        this.registerFiles();
    },

    setType() {
        let type = codeType(this.files[this.curtab].path);
        $('#lang')[0].innerHTML = type;
        let editor = $('.hl')[0];
        editor.className = "hl";
        editor.classList.add('language-' + (type === 'plaintext' ? 'none' : type));
        $('#code')[0].className = "language-" + (type === 'plaintext' ? 'none' : type);
    },

    /**
     * Opens a tab in the editor
     * @param {Number} id The tab number of the file
     */
    openFile(id) { // Show a file in the editor
        while (id >= this.files.length) {
            id = this.files.length - 1;
        }
        if (id === -1){
            id = 0;
            this.createNewFile();
        }
        this.curtab = id;
        this.renderTabBar();
        $('#editor')[0].value = this.files[id].content;
        this.setType();
        $('#editor')[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'a' })) // Update editor
        this.registerFiles();
        $('.tab.active').forEach(el => {
            el.classList.remove('active');
        });
        let tabs = $('.tab');
        for (let t in tabs) {
            if (t === id) {
                tabs[t].classList.add('active');
            }
        }
    },

    /**
     * Apply click listeners to tabs
     */
    applyListeners() {
        $('.close').on('click', (e) => {
            let n = e.target.parentNode.dataset.id;
            if (n && (n in this.files)) {
                this.files.splice(n, 1);
                if (this.curtab >= this.files.length) {
                    this.openFile(0);
                }
                if (this.files.length === 0) {
                    this.createNewFile();
                }
            }
            app.tabs.renderTabBar();
        });
        $('.tab').on('click', (e) => {
            let n = e.target.dataset.id;
            if (n && (n in this.files)) {
                app.tabs.openFile(n);
            }
        })
    },

    /**
     * Update the current file's contents.
     * @param {String} text The new text
     */
    updateFile(text) {
        if (this.files.length > this.curtab) {
            this.files[this.curtab].content = text;
            this.setType();
        }
    },

    /**
     * Create a new file
     * @param {String} p Path to file
     */
    createNewFile(p) {
        this.files.push({
            path: p || false,
            type: 'txt',
            id: this.files.length,
            content: ''
        });

        this.openFile(this.files.length - 1);
        this.registerFiles();
    },

    /**
     * Save a file to the disk
     */
    saveFile() {
        if (this.files.length > this.curtab) {
            if (this.files[this.curtab].path) { // Does the file have a name?
                fs.writeFile(this.files[this.curtab].path, this.files[this.curtab].content, (err) => {
                    if (err) { // Something went wrong.
                        dialogger.showDialog({
                            type: 'error',
                            message: 'error while saving file'
                        });
                    }
                });
            } else { // Otherwise show the save as dialog
                this.saveAs();
            }
        }
        this.registerFiles();
    },

    /**
     * Save file as
     */
    async saveAs() {
        // Show a save dialog
        let fn = await dialogger.showFileDialog();
        if (fn) {
            fs.writeFile(fn, this.files[this.curtab].content, async (err) => {
                if (err) {
                    await dialogger.showDialog({ // Display an error
                        type: 'error',
                        buttons: [
                            'OK'
                        ],
                        defaultId: 0,
                        message: "Failed to save file",
                    });
                    return;
                }
                this.files[this.curtab].path = fn; // Set path
                this.renderTabBar(); // Re-render tabs
            });
        }
        this.registerFiles();
    },

    /**
     * Open a file
     */
    async loadFile() {
        let f = await dialogger.showOpenDialog({
            properties: [
                'openFile',
                'createDirectory'
            ]
        });
        let fn = f[0];
        console.log(fn);

        if (fn) {
            try {
                if (!(this.files.length === 1 && this.files[0].content === "" && !this.files[0].path)) this.createNewFile(fn);
                else this.files[0].path = fn;
                this.updateFile(fs.readFileSync(fn));
                this.openFile(this.files.length - 1);
                this.registerFiles();
            } catch (e) {
                console.error(e);
                dialogger.showDialog({
                    type: 'error',
                    message: "Error while opening file."
                })
            }
        }
    },

    /**
     * Store open files in localStorage
     */

    registerFiles() {
        window.localStorage.setItem('files', JSON.stringify(this.files));
    }
}

window.addEventListener('load', () => {
    if (app.tabs.files.length < 1) {
        app.tabs.createNewFile();
    }
    app.tabs.renderTabBar();
    app.tabs.openFile(0);
});