#!/usr/bin/env node

const fs = require('fs');
const express = require('express');
const app = express();

const redis = require('redis');
const client = redis.createClient('/var/run/redis/redis-server.sock');

const socket = '/home/user/server.sock';
if (fs.existsSync(socket))
  fs.unlinkSync(socket);

const FLAG = 'The_real_flag_is_on_the_server';
const RATE_LIMIT_SEC = 10;
var ip2ts = {};

app.get('/', async (req, res) => {
  if (typeof req.query.url === 'string' && req.query.url.length > 0) {
      let q = await new Promise(resolve => client.rpush(["urls", req.query.url], (err, q) => {
        resolve(q);
      }));
      res.send('We will see your link soon! Queue: ' + q.toString());
  } else if (1 + 1 === 3) {
      res.send(FLAG);
  } else {
    res.send(`
<!doctype html>
<html>
<head>
    <title>The Woven Web</title>
    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
    body {
        background-color: #303030;
        margin: 0;
        padding: 0;
        font-size: 20px;
        text-align: center;
    }
    div {
        width: 600px;
        margin: 5em auto;
        padding: 2em;
        background-color: #f0f0ff;
        border-radius: 2em;
    }
    input[type=text] {
        width: 60%;
    }
    </style>    
</head>
<body>
<div>
    <h1>The Woven Web</h1>
    Share your website with me!
    <br><br>
    <form>
      <input type="text" name="url" placeholder="https://bookgin.tw/" required/>
      <br>
      <br>
      <input type="submit" value="Submit"/>
    </form>
</div>
</body>
</html>`);
  }
});

app.listen(socket, () => {
  fs.chmodSync(socket, '777');
  console.log('Listening on ' + socket);
});
