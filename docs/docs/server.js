const http = require('http'),
	  fs   = require('fs'),
	  mime = require('mime-types');

const server = http.createServer((req, res) => {
	let url = req.url;
	if (url === '/') url = '/index.html';
	let spath = __dirname + url;
	let stream = fs.createReadStream(spath);
	stream.on('open', () => {
		res.writeHead(200, {'content-type': mime.lookup(url)});
		stream.pipe(res);
		console.log(`200 -> ${spath}`);
	});

	stream.on('error', (err) => {
		if (err.code === "ENOENT") {
			res.statusCode = 404;
			res.end('Not found');
			console.log(`404 -> ${spath}`);
		} else {
			res.statusCode = 500;
			res.end('A server error occured. If you keep receiving this message, contact the server administrator.');
			console.log(`500 -> ${err}`);
		}
	});
});

const port = (process.argv.length > 2) ? process.argv[2] : 9080

server.listen(port);
console.log('Listening on port ' + port);
console.log('Ctrl+C to quit');