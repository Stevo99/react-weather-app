var path = require('path');
var express = require('express');
var cors = require('cors');

var CLIENT_DIR = path.join(__dirname, 'client');
var PORT = process.env.PORT || 3000;
var app = express();

app.use(cors());
app.use(express.static(CLIENT_DIR));

if (process.env.NODE_ENV === 'production') {
	//Serving the files on the CLIENT folder
	app.use((req, res, next) => {
		// if not an https server, the site will be redirected to https
		if (req.header('x-forwarded-proto') !== 'https') {
			res.redirect(`https://${req.header('host')}${req.url}`);
		} else {
			next();
		}
	});
}

//Send index.html when the user access the web
app.get('*', function(req, res) {
	res.sendFile(path.join(CLIENT_DIR, 'index.html'));
});

app.listen(PORT);
