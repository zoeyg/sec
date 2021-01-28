```
curl 'http://localhost:3000/validator' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'Accept: */*' \
  -H 'DNT: 1' \
  -H 'X-Requested-With: XMLHttpRequest' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36' \
  -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
  -H 'Origin: http://localhost:3000' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: http://localhost:3000/' \
  -H 'Accept-Language: en-US,en;q=0.9,la;q=0.8' \
  -H 'Cookie: connect.sid=s%3AEyDEqgNUT6L6iUt436FWzvhb6pUe4qkm.6tQGX8iQki71so6HE922JTwFyU9SRzvXaBuG9izfzVo' \
  --data-raw $'type=text&input=%3C\u0021doctype+html%3E%0A%3Chtml+amp+lang%3D%22en%22%3E%0A++%3Chead%3E%0A++++%3Cmeta+charset%3D%22utf-8%22%3E%0A++++%3Cscript+async+src%3D%22https%3A%2F%2Fcdn.ampproject.org%2Fv0.js%22%3E%3C%2Fscript%3E%0A++++%3Ctitle%3EHello%2C+AMPs%3C%2Ftitle%3E%0A++++%3Clink+rel%3D%22canonical%22+href%3D%22https%3A%2F%2Famp.dev%2Fdocumentation%2Fguides-and-tutorials%2Fstart%2Fcreate%2Fbasic_markup%2F%22%3E%0A++++%3Cmeta+name%3D%22viewport%22+content%3D%22width%3Ddevice-width%2Cminimum-scale%3D1%2Cinitial-scale%3D1%22%3E%0A++++%3Cstyle+amp-boilerplate%3Ebody%7B-webkit-animation%3A-amp-start+8s+steps(1%2Cend)+0s+1+normal+both%3B-moz-animation%3A-amp-start+8s+steps(1%2Cend)+0s+1+normal+both%3B-ms-animation%3A-amp-start+8s+steps(1%2Cend)+0s+1+normal+both%3Banimation%3A-amp-start+8s+steps(1%2Cend)+0s+1+normal+both%7D%40-webkit-keyframes+-amp-start%7Bfrom%7Bvisibility%3Ahidden%7Dto%7Bvisibility%3Avisible%7D%7D%40-moz-keyframes+-amp-start%7Bfrom%7Bvisibility%3Ahidden%7Dto%7Bvisibility%3Avisible%7D%7D%40-ms-keyframes+-amp-start%7Bfrom%7Bvisibility%3Ahidden%7Dto%7Bvisibility%3Avisible%7D%7D%40-o-keyframes+-amp-start%7Bfrom%7Bvisibility%3Ahidden%7Dto%7Bvisibility%3Avisible%7D%7D%40keyframes+-amp-start%7Bfrom%7Bvisibility%3Ahidden%7Dto%7Bvisibility%3Avisible%7D%7D%3C%2Fstyle%3E%3Cnoscript%3E%3Cstyle+amp-boilerplate%3Ebody%7B-webkit-animation%3Anone%3B-moz-animation%3Anone%3B-ms-animation%3Anone%3Banimation%3Anone%7D%3C%2Fstyle%3E%3C%2Fnoscript%3E%0A++%3C%2Fhead%3E%0A++%3Cbody%3E%0A++++%3Ch1%3EWelcome+to+the+mobile+web%3C%2Fh1%3E%0A++%3C%2Fbody%3E%0A%3C%2Fhtml%3E&input=<script></script>' \
  --compressed
```

```json
[
  {
    "type": "tag",
    "name": "html",
    "namespace": "http://www.w3.org/1999/xhtml",
    "attribs": {},
    "x-attribsNamespace": {},
    "x-attribsPrefix": {},
    "children": [
      {
        "type": "tag",
        "name": "head",
        "namespace": "http://www.w3.org/1999/xhtml",
        "attribs": {},
        "x-attribsNamespace": {},
        "x-attribsPrefix": {},
        "children": [
          {
            "type": "script",
            "name": "script",
            "namespace": "http://www.w3.org/1999/xhtml",
            "attribs": {},
            "x-attribsNamespace": {},
            "x-attribsPrefix": {},
            "children": [],
            "prev": null,
            "next": null
          }
        ],
        "prev": null,
        "next": {
          "type": "tag",
          "name": "body",
          "namespace": "http://www.w3.org/1999/xhtml",
          "attribs": {},
          "x-attribsNamespace": {},
          "x-attribsPrefix": {},
          "children": [],
          "next": null
        }
      },
      null
    ],
    "parent": {
      "type": "root",
      "name": "root",
      "parent": null,
      "prev": null,
      "next": null,
      "x-mode": "quirks"
    },
    "prev": null,
    "next": null
  }
]
```

BAhsYWby\/JjEtf7XHuRnFggVGbmyJtxKoFaCRn7uaQlmZsl92E5jwhk6HmeZW4Lx2Bhen0XCOSW3dLVfR2QujC5KVZYUVR24U7\/J8pl8Lx\/ZWy6CDdem30LbleE\/SRvVox9jvOWeGEgEe3WmTP+lovbSt9reYD8AcCI4hIXsxZg=
