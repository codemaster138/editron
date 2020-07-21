class Dialogger {
    constructor (ipc) {
        this.ipc = ipc;
    }

    async showFileDialog() {
        return new Promise((resolve, reject) => {
            let data;
            try {
                data = this.ipc.sendSync('ShowSaveDialog');
            } catch (e) {
                reject(e);
                return;
            }
            resolve(data);
        });
    }

    async showOpenDialog(options) {
        return new Promise((resolve, reject) => {
            let data;
            try {
                data = this.ipc.sendSync('ShowOpenDialog', options);
            } catch (e) {
                reject(e);
                return;
            }
            resolve(data);
        });
    }
    
    async showDialog(args) {
        return new Promise((resolve, reject) => {
            let data;
            try {
                data = this.ipc.sendSync('ShowDialogBox', args);
            } catch (e) {
                reject(e);
                return;
            }
            resolve(data);
        });
    }
}

module.exports = (ipc) => {
    return new Dialogger(ipc);
}