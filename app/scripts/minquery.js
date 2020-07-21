/** 
 * Minimalist JQuery
 */

window.$ = (arg) => document.querySelectorAll(arg);
on = function (event, callback, c) {
    for (e of event.split(' ')) {
        if (typeof this[Symbol.iterator] === 'function') {
            this.forEach(element => { element.addEventListener(e, callback, c)});
        } else this.addEventListener(e, callback, c);
    }
}
NodeList.prototype.on = on;
HTMLElement.prototype.on = on;