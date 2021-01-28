const express = require('express');
const app = express();
const session = require('express-session');
const db = require('better-sqlite3')('./db.db', {readonly: true});
const cookieParser = require("cookie-parser");
const FileStore = require('session-file-store')(session);
const fs = require('fs');

app.locals.flag = "REDACTED"
app.use(express.static('static'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

const server = app.listen(3000, function(){
    console.log("Server started on port 3000")
});

app.use(session({
	secret: 'REDACTED',
	resave: false,
	saveUninitialized: true,
	store: new FileStore({path: __dirname+'/sessions/'})
}));

const router = require('./router/main')(app, db, fs);