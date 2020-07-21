# Editron
Editron is a lightweight text & code editor.

## Installation
**Note:** Editron is currently only available for macOS El Capitan (Because my computer is too old to build for any other or newer os). **However**, you're always welcome to [build this project from source](#source-build).

### MacOS El Capitan or newer
**Note:** This might not work on newer systems. I can only confirm functionality on El Capitan.

**Download the newest release**

## Source Build
To build from source, download and unzip this repository. Open your terminal or cmd and navigate to the folder where you unzipped the repo to. Now type ```npm install```. When the command has finished, type ```npm install --only=dev```. When this has finished, type one of the following:
- windows: ```npx electron-packager --icon=app/assets/icons/win.ico```
- macos: ```npx electron-packager --icon=app/assets/icons/mac.icns```
- linux: ```npx electron-packager --icon=app/assets/icons/mac.png```

# Contributing
As with any open-source project, of course, everyone is welcome to contribute to Editron. But if you do, I would like you to follow these contribution guidelines.

## Pull Requests
Your pull request summary should well describe what you are trying to change or fix. Good documentation of your code using comments is greatly appreciated. **If we cannot understand what is going in your pull request, it will not be merged**.

## Versioning
This repo uses semantic versioning (see [semver.org](https://semver.org))

## Feature Requests
Before creating a feature request, please check [this file](https://github.com/codemaster138/editron/blob/master/changelogs/v.next-proposed.md). It contains all proposed features that might become available in the next version. Otherwise, please create an issue from the 'feature request' issue template, and describe what feature you want to add. If you already know how to implement it, please **still create a feature request**. To avoid merge conflicts, we recommend you **don't create your pull request until we explicitly tell you to in a comment on your issue**.