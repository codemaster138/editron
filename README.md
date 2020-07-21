# Editron
Editron is a lightweight text & code editor.

## Installation
**Note:** Editron is currently only available for macOS El Capitan (Because my computer is too old to build for any other or newer os). **However**, you're always welcome to build this project from source.

### MacOS El Capitan or newer
**Note:** This might not work on newer systems. I can only confirm functionality on El Capitan.
**Download the newest release**

## Source Build
To build from source, download and unzip this repository. Open your terminal or cmd and navigate to the folder where you unzipped the repo to. Now type ```npm install```. When the command has finished, type ```npm install --only=dev```. When this has finished, type one of the following:
- windows: ```npx electron-packager --icon=app/assets/icons/win.ico```
- macos: ```npx electron-packager --icon=app/assets/icons/mac.icns```
- linux: ```npx electron-packager --icon=app/assets/icons/mac.png```