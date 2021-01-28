const express = require("express");
const session = require("express-session");
const bodyParser = require('body-parser')
const FileStore = require('session-file-store')(session);
const path = require("path");
const fs = require("fs");
const main = require(path.join(__dirname, "main"));

// Poseidon{S1k3_M0rTy_Y0u_7h0uGh}
const app = express();
app.set("views", path.join(__dirname, "letters"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	resave: false,
	store: new FileStore({path: path.join(__dirname, "ricksess")}),
	saveUninitialized: true,
	secret: "SECRET_GOES_HERE"
}));
main(app, fs, path);

app.listen(6565, () => {
	console.log("Challenge Started On Port: 6565.");
});
