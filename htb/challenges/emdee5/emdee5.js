const axios = require('axios').create({ withCredentials: true });
const md5 = require('md5');
const qs = require('qs');

axios({
    url: 'http://docker.hackthebox.eu:31511',
    method: 'GET',
    headers: { Cookie: 'PHPSESSID=4rhd55h5vagbi10ijndk090850' }
}).then(response => {
    console.log(response.data);
    match = response.data.match(/'center'>(\w+)<\/h3>/);
    let hash = md5(match[1]);
    console.log(md5(match[1]));
    return axios({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded',
        Cookie: 'PHPSESSID=4rhd55h5vagbi10ijndk090850' },
        url: 'http://docker.hackthebox.eu:31511',
        data: 'hash=' + hash
    })
}).then(res => {
    console.log(res.data);
});