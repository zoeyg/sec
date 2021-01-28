const axios = require('axios');
const lineReader = require('line-reader');
const _ = require('lodash');

const requests = {};
const simultaneousRequests = parseInt(process.argv[4]);
const listFile = process.argv[2];
const hostUrl = process.argv[3];
let id = 0;
let oReader = null;

const doRequest = (id, line, callback) => {
    requests[id] = { inProgress: true };
    const startTime = Date.now();
    axios({
        method: 'GET',
        url: 'http://10.10.10.173/getPatent_alphav1.0.php?id=' + encodeURIComponent(line)
    }).then((res) => {
        requests[id] = {
            length: res.data.length,
            relativeLength: res.data.length - line.length,
            line: line,
            encodedLine: encodeURIComponent(line),
            data: res.data,
            responseTime: Date.now() - startTime
        };
        callback();
    });
};

const handleFinishedRequest = () => {
    if (oReader.hasNextLine()) {
        oReader.nextLine((err, line) => {
            doRequest(id++, line, handleFinishedRequest);
        });
    } else {
        if (!_.every(requests, (request) => !request.inProgress )) {
            return;
        }
        //console.log(JSON.stringify(requests, null, 2));
        const lengths = {};
        // Find the most common lengths
        Object.keys(requests).forEach(key => {
            const request = requests[key];
             if (!lengths[request.relativeLength]) {
                lengths[request.relativeLength] = 1;
             } else {
                lengths[request.relativeLength]++;
             }
        });
        let highestCount = -1;
        let mostCommonLength = -1;
        Object.keys(lengths).forEach(key => {
            let length = lengths[key];
            if (length > highestCount) {
                highestCount = length;
                mostCommonLength = key;
            }
        });

        const filtered = [];
        // Filter stuff that's not the most common length
        Object.keys(requests).forEach(key => {
            const request = requests[key];
            if (request.relativeLength != mostCommonLength) {
                filtered.push(request);
            }
        });
        requests.filtered = filtered;
        console.log(JSON.stringify(requests, null, 2));
    }
};

lineReader.open(listFile, function(err, reader) {
    oReader = reader;

    if (err) throw err;
    while (reader.hasNextLine() && id < simultaneousRequests) {
        reader.nextLine(function(err, line) {
            doRequest(id++, line, handleFinishedRequest);
        });
    }
});

