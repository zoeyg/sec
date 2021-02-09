Fileserver written in go

On startup runs through the files and adds them into a FileServFS,
with a map of filename to offset on the data property which is an
array of bytes containing the files

There's something weird going on with the offsets, potentially related to the "encoded size" which appends the messages to the bottom of the files

In terms of order in the data array, I believe the flag is right after IMG_1052.jpg.

Curl requests for the images result in a closed connection, with the content length header being longer than what's received

```sh
╭─zoey@parrot-virtual ~/sec/justctf/go-fs ‹master*› 
╰─$ curl -v http://gofs.web.jctf.pro/IMG_1052.jpg -o img_1052_curl.jpg
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0*   Trying 188.166.81.230:80...
* Connected to gofs.web.jctf.pro (188.166.81.230) port 80 (#0)
> GET /IMG_1052.jpg HTTP/1.1
> Host: gofs.web.jctf.pro
> User-Agent: curl/7.72.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Accept-Ranges: bytes
< Content-Length: 1368311
< Content-Type: image/jpeg
< Last-Modified: Sat, 30 Jan 2021 02:03:41 GMT
< Served-By: FileServ v0.0.0b
< Date: Sat, 30 Jan 2021 07:06:23 GMT
< 
{ [6788 bytes data]
  0 1336k    0  6788    0     0  23246      0  0:00:58 --:--:--  0:00:58 23167* transfer closed with 24823 bytes remaining to read
 98 1336k   98 1312k    0     0  1128k      0  0:00:01  0:00:01 --:--:-- 1128k
* Closing connection 0
curl: (18) transfer closed with 24823 bytes remaining to read
```

There's some asynchronicity going on as well if you request a bunch of files at once, but I'm not familiar enough with go to know if there's overlap in terms of what's being accessed when.

Seems that File.Seek is being called for the smaller text files but not for the images?

```
FileServFS.Open(name=`/go`)
File.Stat(file=`/go`)
File.Read(file=/go@[2752875-2753477), len(p)=512): off=2752875, n=512
File.Seek(file=`/go`, offset=0, whence=0)
File.Read(file=/go@[2752875-2753477), len(p)=731): off=2752875, n=602
File.Close(file=`/go`)
FileServFS.Open(name=`/IMG_0525.jpg`)
File.Stat(file=`/IMG_0525.jpg`)
File.Read(file=/IMG_0525.jpg@[0-363033), len(p)=32768): off=0, n=32768
File.Read(file=/IMG_0525.jpg@[0-363033), len(p)=32768): off=32768, n=32768
File.Read(file=/IMG_0525.jpg@[0-363033), len(p)=32768): off=65536, n=32768
File.Read(file=/IMG_0525.jpg@[0-363033), len(p)=32768): off=98304, n=32768
File.Read(file=/IMG_0525.jpg@[0-363033), len(p)=32768): off=131072, n=32768
File.Read(file=/IMG_0525.jpg@[0-363033), len(p)=32768): off=163840, n=32768
File.Read(file=/IMG_0525.jpg@[0-363033), len(p)=32768): off=196608, n=32768
File.Read(file=/IMG_0525.jpg@[0-363033), len(p)=32768): off=229376, n=32768
File.Close(file=`/IMG_0525.jpg`)
FileServFS.Open(name=`/lorem`)
File.Stat(file=`/lorem`)
File.Read(file=/lorem@[2753477-2754052), len(p)=512): off=2753477, n=512
File.Seek(file=`/lorem`, offset=0, whence=0)
File.Read(file=/lorem@[2753477-2754052), len(p)=704): off=2753477, n=575
File.Close(file=`/lorem`)
```