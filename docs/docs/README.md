# Easydoc
Document your code like a pro.

## DEMO
Check out the demo here: [demo](http://learn.jakescode.net/node-js-the-complete-course)

## Usage
Follow the installation instructions below. Then place your documentation into this README.md file.

## Installation
To get started, just download easydoc from github using
```bash
git clone https://github.com/codemaster138/easydoc
```
You can now either upload the easydoc folder to your server or serve it yourself.

## Customization
Currently, easydoc is only slightly customizable, but more customization options are coming in the next releases.

1. You can change the logo by replacing the contents of the logo div in the html. If you choose to use a text logo, use ```<span>``` elements to make parts of the text appear another color.
2. Changing the primary color: In the main.css file, change the html element's ```--primary``` property to whatever color you want. Gradients are *__not__* supported.

## Self-hosting
If you already have a server like apache set up on your server, you can simply delete the server.js file and use your existing server.
However, easydoc also comes with an own http server. If you want to use this, go to your terminal, move into your easydoc directory and type
```bash
npm install
```
To run the server, type
```bash
npm start <port>
```
replace port with the port you wish to use. Default is 9080.

## Contributing
If you have any suggestions for improvements, please create an issue. The name must start with "**Suggestion:**"". If you have allready coded your improvement, please create a pull request. You must add a file, **pullrequest.md**, that describes all changes that you made in detail. Please make a as few changes as possible per pull request.

## Reporting problems
If you encounter any problems with easydoc, please create an issue. The name should start with "**Issue:**" or "**Bug:**".

## Upcomming in next version/Known issues
Currently, the search bar does not work. In the next release, this will be fixed.
