/**
 * Take Care of the top bar
 */
const os = require('os');

setInterval(() => {
    if (!window.screenTop && !window.screenY) {
        document.body.style.setProperty('--topbar-height', '0px');
    } else {
        document.body.style.setProperty('--topbar-height', process.platform === "darwin" ? '22px' : '0px');
    }
}, 1000);

/**
 * Syntax Highlighting editor code
 */

tab_size = 4;
window.onload = () => {
    if (process.platform === 'darwin') {
        document.body.classList.add('platform-mac');
    }
    document.body.style.setProperty('--topbar-height', process.platform === "darwin" ? '22px' : '0px'); // Some more topbar code
    let te = document.getElementById('editor');
    te.on('ready load keyup keydown change', updatePos);
    te.on('ready load keyup keydown change', handleKey); // .on defined in minquery.js
    te.on('input change keyup keydown keypress', () => { textarea_height(te, Number.MAX_SAFE_INTEGER) });

    $(".allow-tabs")[0].addEventListener('keydown', async function (e) {
        if (e.keyCode === 9) { // tab was pressed
            // get caret position/selection
            var start = this.selectionStart;
            var end = this.selectionEnd;

            var target = e.target;
            var value = target.value || target.innerText;

            // set textarea value to: text before caret + tab + text after caret
            target.value = value.substring(0, start)
                + " ".repeat(tab_size)
                + value.substring(end);

            // put caret at right position again (add one for the tab)
            this.selectionStart = this.selectionEnd = start + tab_size;

            // prevent the focus lose
            e.preventDefault();
        }

        // Copy/paste
        if ((e.metaKey || e.ctrlKey) && (e.keyCode === 86)) {
            var cliptext = await navigator.clipboard.readText();
            var start = this.selectionStart;
            var end = this.selectionEnd;
            var target = e.target;
            var value = target.value || target.innerText;

            target.value = value.substring(0, start)
                + cliptext
                + value.substring(end);
            this.selectionStart = this.selectionEnd = start + cliptext.length;
        }
    }, false);

    // Horizontal scrolling in tab bar
    (function () {
        function scrollHorizontally(e) {
            e = window.event || e;
            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
            e.target.parentNode.scrollLeft -= (delta * 40); // Multiplied by 40
            e.preventDefault();
        }
        if (document.body.addEventListener) {
            $('.horizontal-scroll').on("mousewheel DOMMouseScroll", scrollHorizontally, false);
        } else {
            // IE 6/7/8
            $('.horizontal-scroll').attachEvent("onmousewheel", scrollHorizontally);
        }
    })();
}

function handleKey() {
    document.getElementById('code').innerHTML = escapeHtml(document.getElementById('editor').value);
    Prism.highlightElement(document.getElementById('code'), false);

    // Update file content
    app.tabs.updateFile(document.getElementById('editor').value);
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// TextArea is the Id from your textarea element
// MaxHeight is the maximum height value
function textarea_height(textarea, MaxHeight) {
    let textareaRows = textarea.value.split("\n");
    if (textareaRows[0] != "undefined" && textareaRows.length < MaxHeight) counter = textareaRows.length;
    else if (textareaRows.length >= MaxHeight) counter = MaxHeight;
    else counter = 1;
    textarea.rows = counter;
    let longest = textareaRows.reduce((acc, val) => val.length > acc.length ? val : acc);
    textarea.cols = longest.length;
}

// Update position in statusbar
function updatePos() {
    let te = $('#editor')[0];
    var textLines = te.value.substr(0, te.selectionStart).split("\n"); // Get lines
    var currentLineNumber = textLines.length; // Get current line number
    var currentColumnIndex = textLines[textLines.length-1].length; // get current index
    $('#pos')[0].innerHTML = `Ln ${currentLineNumber}, Col ${currentColumnIndex}`;
}