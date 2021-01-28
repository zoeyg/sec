const lineReader = require('line-reader');
const { exec } = require('child_process');

const skip = parseInt(process.argv[3]);
let linesSkipped = 0;
let lineCount = skip;

console.log('Opening ' + process.argv[2]);
lineReader.open(process.argv[2], function(err, reader) {

    if (err) {
        console.error('Error', err);
        process.exit(1);
    }

    while(linesSkipped++ < skip) {
        reader.nextLine((err, line) => {
            if (err) {
                console.error('Error', err);
                process.exit(1);
            }
            console.log('Skipping ' + line);
        });
    }

    console.log(reader);
    let interval = setInterval(() => {
        if (reader.hasNextLine()) {
            reader.nextLine((err,line) => {
                if (err) {
                    console.error('Error', err);
                    process.exit(1);
                }
                exec('/home/zoey/htb/patents/xxe/do-xxe.sh ' + line, (error, stdout, stderr) => {
                    if (error) {
                        console.log('ERROR', error)
                    } else {
                        console.log(lineCount++ + ' - ' + line);
                    }
                });
            });
        } else {
            clearInterval(interval);
        }
    }, 250);

});