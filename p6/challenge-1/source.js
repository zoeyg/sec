const express = require('express');
const vm = require('vm');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
	res.render('index', { version: process.version });
});

app.get('/run', (req, res) => {
	const code = req.query.code;
	const length = req.query.length || 100;

	if (typeof code === 'string' && code) {
		const cachedData = Buffer.from(code, 'hex');

		if (cachedData.length > 1000) {
			res.end('Too Long!');
			return;
		}

		const script = new vm.Script('1'.repeat(length), { cachedData });
		const result = script.runInThisContext();

		res.end(
			`[*] Length of payload: ${cachedData.length}\n[!] Result: ${result}`
		);
	} else {
		res.end('No Input provided');
	}
});

app.get('/source', (req, res) => {
	res.sendFile(__filename);
});

app.listen(8080);