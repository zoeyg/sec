const fs = require("fs");
const parse = require("./lib/parse-http-string");
const http = require("http");
const https = require("https");
const axiosL = require("axios");
const lineReader = require("line-reader");
const _ = require("lodash");
const argv = require("minimist")(process.argv);

const httpAgent = new http.Agent({
  keepAlive: true,
});
const axios = axiosL.create({
  httpAgent,
});

const wordlist = argv.w;
const rawRequest = fs.readFileSync(argv.r, { encoding: "utf8" });
const requests = {};
const error = [];

let id = 0;
let oReader = null;
let simultaneousRequests = argv.m || "25";
let numRequests = 0;
let totalRequests = 0;
let requestTimes = [];
let avgRequestTime = 0;
let waiting = false;
simultaneousRequests = parseInt(simultaneousRequests);

const generateRequest = (line) => {
  if (line[0] === "/") {
    line = line.substring(1);
  }
  const replacedRequest = rawRequest.replace("§line§", line);
  const config = parse(replacedRequest);
  if (argv.p === "https") {
    config.baseURL = "https://" + config.baseURL;
  } else {
    config.baseURL = "http://" + config.baseURL;
  }
  return config;
};

const doRequest = (id, line, callback) => {
  totalRequests++;
  requests[id] = { inProgress: true };
  const startTime = Date.now();
  const config = generateRequest(line);
  axios(config)
    .then((res) => {
      console.log(config.url + ": " + res.status);
      numRequests++;
      requests[id] = {
        length: res.data.length,
        relativeLength: res.data.length - line.length,
        line: line,
        encodedLine: encodeURIComponent(line),
        data: res.data,
        responseTime: Date.now() - startTime,
      };
      requestTimes.push(Date.now() - startTime);
      callback();
    })
    .catch((err) => {
      numRequests++;
      if (!err.response) {
        console.error("axios error", err.code);
        error.push({
          line,
        });
      } else {
        requests[id] = {
          length: err.response.data.length,
          relativeLength: err.response.data.length - line.length,
          line: line,
          encodedLine: encodeURIComponent(line),
          data: err.response.data,
          responseTime: Date.now() - startTime,
        };
      }
      requestTimes.push(Date.now() - startTime);
      callback();
    });
};

const handleFinishedRequest = () => {
  if (avgRequestTime > 30000) {
    if (!waiting) {
      waiting = true;
      setTimeout(handleFinishedRequest, 30000);
    }
  } else {
    waiting = false;
    if (oReader.hasNextLine()) {
      oReader.nextLine((err, line) => {
        doRequest(id++, line, handleFinishedRequest);
        if (argv.e) {
          doRequest(id++, line + "." + argv.e, handleFinishedRequest);
        }
      });
    } else {
      if (!_.every(requests, (request) => !request.inProgress)) {
        return;
      }
      //console.log(JSON.stringify(requests, null, 2));
      const lengths = {};
      // Find the most common lengths
      Object.keys(requests).forEach((key) => {
        const request = requests[key];
        if (!lengths[request.relativeLength]) {
          lengths[request.relativeLength] = 1;
        } else {
          lengths[request.relativeLength]++;
        }
      });
      let highestCount = -1;
      let mostCommonLength = -1;
      Object.keys(lengths).forEach((key) => {
        let length = lengths[key];
        if (length > highestCount) {
          highestCount = length;
          mostCommonLength = key;
        }
      });

      const filtered = [];
      // Filter stuff that's not the most common length
      Object.keys(requests).forEach((key) => {
        const request = requests[key];
        if (request.relativeLength != mostCommonLength) {
          filtered.push(request);
        }
      });
      requests.filtered = filtered;
      console.log(JSON.stringify(requests, null, 2));
    }
  }
};

lineReader.open(wordlist, function (err, reader) {
  oReader = reader;

  if (err) throw err;
  while (reader.hasNextLine() && id < simultaneousRequests) {
    reader.nextLine(function (err, line) {
      doRequest(id++, line, handleFinishedRequest);
      if (argv.e) {
        doRequest(id++, line + "." + argv.e, handleFinishedRequest);
      }
    });
  }
});

setInterval(() => {
  const sumTimes = requestTimes.reduce((prev, cur) => prev + cur, 0);
  avgRequestTime = Math.floor(sumTimes / numRequests);
  console.error(
    "Requests per minute",
    numRequests,
    ", Average Request Time:",
    avgRequestTime,
    "ms, total requests",
    totalRequests
  );
  numRequests = 0;
}, 5000);
