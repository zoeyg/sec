
# Thanos

http://ctf.cscml.zenysec.com:20030/

The index mentions something about source control, let's check for .git folder.  It's there, lets extract and explore:

```
╭─zoey@virtual-parrot ~/sec ‹master*› 
╰─$ tools/GitTools/Dumper/gitdumper.sh http://ctf.cscml.zenysec.com:20030/.git/ cscml/thanos/git
###########
# GitDumper is part of https://github.com/internetwache/GitTools
#
# Developed and maintained by @gehaxelt from @internetwache
#
# Use at your own risk. Usage might be illegal in certain circumstances. 
# Only for educational purposes!
###########


[+] Downloaded: HEAD
[-] Downloaded: objects/info/packs
[+] Downloaded: description
[+] Downloaded: config
[+] Downloaded: COMMIT_EDITMSG
[+] Downloaded: index
[-] Downloaded: packed-refs
[+] Downloaded: refs/heads/master
[-] Downloaded: refs/remotes/origin/HEAD
[-] Downloaded: refs/stash
[+] Downloaded: logs/HEAD
[+] Downloaded: logs/refs/heads/master
[-] Downloaded: logs/refs/remotes/origin/HEAD
[-] Downloaded: info/refs
[+] Downloaded: info/exclude
[-] Downloaded: /refs/wip/index/refs/heads/master
[-] Downloaded: /refs/wip/wtree/refs/heads/master
[+] Downloaded: objects/0a/f3d4209a28a24e18d422bb770e995f91725f15
[-] Downloaded: objects/00/00000000000000000000000000000000000000
[+] Downloaded: objects/4f/2a3c6a15811216659cc48d89ee71f5f68605e4
[+] Downloaded: objects/af/7c13b2c9c38110e33b088962d5816a9c8df10c
[+] Downloaded: objects/35/945ec04d838604a15afefc0e37cfcd5838f5b3
[+] Downloaded: objects/95/40287a3d652c60055ea01306998b27c31e35cd
[+] Downloaded: objects/be/18391dfb040b52faf0c58462a23b8b6d8cfee2
[+] Downloaded: objects/a8/20376bd0934adc1fc578c1f8f8889181d6c20b
[+] Downloaded: objects/63/85461a0ca69d95218cb29474b42f0ad05d3a88
[+] Downloaded: objects/46/1bea50945d85f33acbdb4876bd180662863cad
[+] Downloaded: objects/17/00f1d5e7cfa11eef54f3f5edef19dc96a4a4a5
[+] Downloaded: objects/97/58730c9189e6f3d8954a6e6b294f21ca6b6c22
[+] Downloaded: objects/e8/85c9e2814eb21f779c362d41debbbb9ca92494
[+] Downloaded: objects/37/00ce260322b68b2da8f412f135fe2ebc521d95
```

Only thing that's immediately obvious in the repo is `index.html` which we already have.  Let's use extractor to see what else we can find.

```
╭─zoey@virtual-parrot ~/sec ‹master*› 
╰─$ tools/GitTools/Extractor/extractor.sh cscml/thanos/git cscml/thanos/extract
###########
# Extractor is part of https://github.com/internetwache/GitTools
#
# Developed and maintained by @gehaxelt from @internetwache
#
# Use at your own risk. Usage might be illegal in certain circumstances. 
# Only for educational purposes!
###########
[+] Found commit: 0af3d4209a28a24e18d422bb770e995f91725f15
[+] Found file: /home/zoey/sec/cscml/thanos/extract/0-0af3d4209a28a24e18d422bb770e995f91725f15/index.html
[+] Found commit: 4f2a3c6a15811216659cc48d89ee71f5f68605e4
[+] Found file: /home/zoey/sec/cscml/thanos/extract/1-4f2a3c6a15811216659cc48d89ee71f5f68605e4/index.html
[+] Found commit: af7c13b2c9c38110e33b088962d5816a9c8df10c
[+] Found file: /home/zoey/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c/index.html
[+] Found file: /home/zoey/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c/mind
[+] Found file: /home/zoey/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c/power
[+] Found file: /home/zoey/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c/reality
[+] Found file: /home/zoey/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c/soul
[+] Found file: /home/zoey/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c/space
[+] Found file: /home/zoey/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c/time
[+] Found commit: 35945ec04d838604a15afefc0e37cfcd5838f5b3
[+] Found file: /home/zoey/sec/cscml/thanos/extract/3-35945ec04d838604a15afefc0e37cfcd5838f5b3/index.html
[+] Found file: /home/zoey/sec/cscml/thanos/extract/3-35945ec04d838604a15afefc0e37cfcd5838f5b3/mind
[+] Found file: /home/zoey/sec/cscml/thanos/extract/3-35945ec04d838604a15afefc0e37cfcd5838f5b3/power
[+] Found file: /home/zoey/sec/cscml/thanos/extract/3-35945ec04d838604a15afefc0e37cfcd5838f5b3/reality
[+] Found file: /home/zoey/sec/cscml/thanos/extract/3-35945ec04d838604a15afefc0e37cfcd5838f5b3/soul
[+] Found file: /home/zoey/sec/cscml/thanos/extract/3-35945ec04d838604a15afefc0e37cfcd5838f5b3/space
[+] Found file: /home/zoey/sec/cscml/thanos/extract/3-35945ec04d838604a15afefc0e37cfcd5838f5b3/time
```

The `commit-meta.txt` for commit hash 2 has `BACKUP THE STONES` so lets go with that one.

```
╭─zoey@virtual-parrot ~/sec ‹master*› 
╰─$ cd cscml/thanos/extract 
╭─zoey@virtual-parrot ~/sec/cscml/thanos/extract ‹master*› 
╰─$ cd 2-af7c13b2c9c38110e33b088962d5816a9c8df10c 
╭─zoey@virtual-parrot ~/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c ‹master*› 
╰─$ ls -l
total 2296
-rw-r--r-- 1 zoey zoey    220 Jul  2 19:08 commit-meta.txt
-rw-r--r-- 1 zoey zoey   1671 Jul  2 19:08 index.html
-rw-r--r-- 1 zoey zoey  88900 Jul  2 19:08 mind
-rw-r--r-- 1 zoey zoey 450000 Jul  2 19:08 power
-rw-r--r-- 1 zoey zoey 450000 Jul  2 19:08 reality
-rw-r--r-- 1 zoey zoey 450000 Jul  2 19:08 soul
-rw-r--r-- 1 zoey zoey 450000 Jul  2 19:08 space
-rw-r--r-- 1 zoey zoey 450000 Jul  2 19:08 time
╭─zoey@virtual-parrot ~/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c ‹master*› 
╰─$ file mind
mind: data
╭─zoey@virtual-parrot ~/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c ‹master*› 
╰─$ file power
power: Zip archive data, at least v2.0 to extract
╭─zoey@virtual-parrot ~/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c ‹master*› 
╰─$ file reality
reality: data
╭─zoey@virtual-parrot ~/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c ‹master*› 
╰─$ file soul 
soul: data
╭─zoey@virtual-parrot ~/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c ‹master*› 
╰─$ file space 
space: data
╭─zoey@virtual-parrot ~/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c ‹master*› 
╰─$ file time
time: data
```

Looks like 6 files, mostly of the same size, and one has a zip file header.  Perhaps it's a multipart zip file.  Let's try some combinations and see what happens.
Eventually we found one that worked...

```
╭─zoey@virtual-parrot ~/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c ‹master*› 
╰─$ cat power space reality soul time mind > test.zip
╭─zoey@virtual-parrot ~/sec/cscml/thanos/extract/2-af7c13b2c9c38110e33b088962d5816a9c8df10c ‹master*› 
╰─$ unzip test.zip 
Archive:  test.zip
  inflating: infinity-stones.png
```

In the image is a picture of thanos, the stones, and the flag.