const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
	console.log(`Request for ${req.url} by method ${req.method}.`);

	if (req.method == 'GET') {
		var fileUrl;
		if (req.url == '/') fileUrl = '/index.html';
		else fileUrl = req.url;

		var filePath = path.resolve('./public' + fileUrl);
		const fileExt = path.extname(filePath);
		if (fileExt == '.html') {
			fs.exists(filePath, (exists) => {
				if (!exists) {
					res.statusCode = 404;
					res.setHeader('Content-Type', 'text/html');
					res.end('<html><head><title>404</title></head><body>Not found!</body></html>');

					return;
				} else {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'text/html');
					fs.createReadStream(filePath).pipe(res);
				}
			});
		} else {
			res.statusCode = 404;
			res.setHeader('Content-Type', 'text/html');
			res.end('<html><head><title>404</title></head><body>Not an HTML file!</body></html>');

			return;
		}
	} else {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/html');
		res.end('<html><head><title>404</title></head><body>' + req.method + ' requests not supported!</body></html>');

		return;
	}
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}`);
});