# anti-textbook

Create the public key from the private in `data.txt`.

```
╭─zoey@nomadic ~/sec/redpwnctf/anti-textbook 
╰─$ RsaCtfTool/RsaCtfTool.py --createpub -n 23476345782117384360316464293694572348021858182972446102249052345232474617239084674995381439171455360619476964156250057548035539297034987528920054538760455425802275559282848838042795385223623239088627583122814519864252794995648742053597744613214146425693685364507684602090559028534555976544379804753832469034312177224373112610128420211922617372377101405991494199975508780694545263130816110474679504768973743009441005450839746644168233367636158687594826435608022717302508912914016439961300625816187681031915377565087756094989820015507950937541001438985964760705493680314579323085217869884649720526665543105616470022561 -e 65537 
private argument is not set, the private key will not be displayed, even if recovered.
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuffuWhYrpTW8cdcAWUwe
T8oZYCp/8pKPYj4eZ3pd7mhYoCkSSeqZ5e+L33O38SoMANogM1NBayYlumOcPxC/
C9PHMF6AlaLDH+yX/Fg+a055m0O7+5pJNUVuRn9z7aYhhubnRyjk2cVTHLmOHqK9
FPM1QBBdouddMgZYE6plaBdBIMwQ8txuZQs6t862zJfA0/cgT47TtiTNkouHkAuT
VXBPcbM5pXIu7MoflJrUjQ0ljuOIFgXQ7wCFusXrIpvuVpqLzRvTD69GA7Cj0Dt9
ij7KPrBFM2jFyR8vnm5w+T6sGafXgJEEj0sLmbIReWcNeyHC2Tl9OniyMEqPeLsZ
oQIDAQAB
-----END PUBLIC KEY-----
```

Turn it into a binary file

```
╭─zoey@nomadic ~/sec/redpwnctf/anti-textbook 
╰─$ echo "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuffuWhYrpTW8cdcAWUweT8oZYCp/8pKPYj4eZ3pd7mhYoCkSSeqZ5e+L33O38SoMANogM1NBayYlumOcPxC/C9PHMF6AlaLDH+yX/Fg+a055m0O7+5pJNUVuRn9z7aYhhubnRyjk2cVTHLmOHqK9FPM1QBBdouddMgZYE6plaBdBIMwQ8txuZQs6t862zJfA0/cgT47TtiTNkouHkAuTVXBPcbM5pXIu7MoflJrUjQ0ljuOIFgXQ7wCFusXrIpvuVpqLzRvTD69GA7Cj0Dt9ij7KPrBFM2jFyR8vnm5w+T6sGafXgJEEj0sLmbIReWcNeyHC2Tl9OniyMEqPeLsZoQIDAQAB" | base64 -d > pubkey
```

Get the sha256sum of the key.

```
╭─zoey@nomadic ~/sec/redpwnctf/anti-textbook 
╰─$ sha256sum pubkey                                      9db105389dd81cfb4b59ff1a4c0670c630b1800e542323111d5c5cb9af72031f  pubkey
```

Plug it into `crt.sh`'s advanced search

```
╭─zoey@nomadic ~/sec/redpwnctf/anti-textbook 
╰─$ curl --silent https://crt.sh/\?spkisha256\=9db105389dd81cfb4b59ff1a4c0670c630b1800e542323111d5c5cb9af72031f | grep '?id'
    <TD style="text-align:center"><A href="?id=2001057066">2001057066</A></TD>
    <TD style="text-align:center"><A href="?id=1998063179">1998063179</A></TD>
```

And we find two entries, let's checkout one to find the address

```
╭─zoey@nomadic ~/sec/redpwnctf/anti-textbook 
╰─$ curl https://crt.sh/\?id\=2001057066 | grep commonName
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 23424    0 23424    0     0  18088      0 --:--:--  0:00:01 --:--:-- 18088
...
commonName&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=&nbsp;oa4gio7glypwggb9iu3rh8mrc87tnjbs.flag.ga
...
```

And now let's request something from the server.

```
╭─zoey@nomadic ~/sec/redpwnctf/anti-textbook 
╰─$ curl https://oa4gio7glypwggb9iu3rh8mrc87tnjbs.flag.ga
flag{c3rTific4t3_7r4n5pArAncY_fTw}
```
