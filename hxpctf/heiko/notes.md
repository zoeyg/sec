```sh
root@b80c832b6dc1:/var/www/html# strace man --troff-device=html --encoding=UTF-8 ftqhasd ftqhasd 2>&1 | grep ftqhasd
execve("/usr/bin/man", ["man", "--troff-device=html", "--encoding=UTF-8", "ftqhasd", "ftqhasd"], 0x7fff7d59aa60 /* 8 vars */) = 0
write(2, "No manual entry for ftqhasd\n", 28No manual entry for ftqhasd
stat("/usr/local/sbin/ftqhasd", 0x7ffc3acb32f0) = -1 ENOENT (No such file or directory)
stat("/usr/local/bin/ftqhasd", 0x7ffc3acb32f0) = -1 ENOENT (No such file or directory)
stat("/usr/sbin/ftqhasd", 0x7ffc3acb32f0) = -1 ENOENT (No such file or directory)
stat("/usr/bin/ftqhasd", 0x7ffc3acb32f0) = -1 ENOENT (No such file or directory)
stat("/sbin/ftqhasd", 0x7ffc3acb32f0)   = -1 ENOENT (No such file or directory)
stat("/bin/ftqhasd", 0x7ffc3acb32f0)    = -1 ENOENT (No such file or directory)
write(2, "No manual entry for ftqhasd\n", 28No manual entry for ftqhasd
stat("/usr/local/sbin/ftqhasd", 0x7ffc3acb32f0) = -1 ENOENT (No such file or directory)
stat("/usr/local/bin/ftqhasd", 0x7ffc3acb32f0) = -1 ENOENT (No such file or directory)
stat("/usr/sbin/ftqhasd", 0x7ffc3acb32f0) = -1 ENOENT (No such file or directory)
stat("/usr/bin/ftqhasd", 0x7ffc3acb32f0) = -1 ENOENT (No such file or directory)
stat("/sbin/ftqhasd", 0x7ffc3acb32f0)   = -1 ENOENT (No such file or directory)
stat("/bin/ftqhasd", 0x7ffc3acb32f0)    = -1 ENOENT (No such file or directory)
root@b80c832b6dc1:/var/www/html# strace man --troff-device=html --encoding=UTF-8 ftqhasd ftqhasd\/. 2>&1 | grep ftqhasd
execve("/usr/bin/man", ["man", "--troff-device=html", "--encoding=UTF-8", "ftqhasd", "ftqhasd/."], 0x7ffddf3d8fa0 /* 8 vars */) = 0
stat("ftqhasd-ftqhasd/.", 0x7ffed0585720) = -1 ENOENT (No such file or directory)
write(2, "ftqhasd-ftqhasd/.", 17ftqhasd-ftqhasd/.)       = 17
stat("ftqhasd_ftqhasd/.", 0x7ffed0585720) = -1 ENOENT (No such file or directory)
write(2, "ftqhasd_ftqhasd/.", 17ftqhasd_ftqhasd/.)       = 17
write(2, "No manual entry for ftqhasd\n", 28No manual entry for ftqhasd
stat("/usr/local/sbin/ftqhasd", 0x7ffed0585780) = -1 ENOENT (No such file or directory)
stat("/usr/local/bin/ftqhasd", 0x7ffed0585780) = -1 ENOENT (No such file or directory)
stat("/usr/sbin/ftqhasd", 0x7ffed0585780) = -1 ENOENT (No such file or directory)
stat("/usr/bin/ftqhasd", 0x7ffed0585780) = -1 ENOENT (No such file or directory)
stat("/sbin/ftqhasd", 0x7ffed0585780)   = -1 ENOENT (No such file or directory)
stat("/bin/ftqhasd", 0x7ffed0585780)    = -1 ENOENT (No such file or directory)
stat("ftqhasd/.", 0x7ffed0585720)       = -1 ENOENT (No such file or directory)
write(2, "ftqhasd/.", 9ftqhasd/.)                = 9
write(2, "No manual entry for ftqhasd/.\n", 30No manual entry for ftqhasd/.
stat("ftqhasd/.", 0x7ffed0585780)       = -1 ENOENT (No such file or directory)
root@b80c832b6dc1:/var/www/html# strace man --troff-device=html --encoding=UTF-8 ftqhasd ftqhasd\/.. 2>&1 | grep ftqhasd
execve("/usr/bin/man", ["man", "--troff-device=html", "--encoding=UTF-8", "ftqhasd", "ftqhasd/.."], 0x7fffeea33db0 /* 8 vars */) = 0
stat("ftqhasd-ftqhasd/..", 0x7ffd2796bf10) = -1 ENOENT (No such file or directory)
write(2, "ftqhasd-ftqhasd/..", 18ftqhasd-ftqhasd/..)      = 18
stat("ftqhasd_ftqhasd/..", 0x7ffd2796bf10) = -1 ENOENT (No such file or directory)
write(2, "ftqhasd_ftqhasd/..", 18ftqhasd_ftqhasd/..)      = 18
write(2, "No manual entry for ftqhasd\n", 28No manual entry for ftqhasd
stat("/usr/local/sbin/ftqhasd", 0x7ffd2796bf70) = -1 ENOENT (No such file or directory)
stat("/usr/local/bin/ftqhasd", 0x7ffd2796bf70) = -1 ENOENT (No such file or directory)
stat("/usr/sbin/ftqhasd", 0x7ffd2796bf70) = -1 ENOENT (No such file or directory)
stat("/usr/bin/ftqhasd", 0x7ffd2796bf70) = -1 ENOENT (No such file or directory)
stat("/sbin/ftqhasd", 0x7ffd2796bf70)   = -1 ENOENT (No such file or directory)
stat("/bin/ftqhasd", 0x7ffd2796bf70)    = -1 ENOENT (No such file or directory)
stat("ftqhasd/..", 0x7ffd2796bf10)      = -1 ENOENT (No such file or directory)
write(2, "ftqhasd/..", 10ftqhasd/..)              = 10
write(2, "No manual entry for ftqhasd/..\n", 31No manual entry for ftqhasd/..
stat("ftqhasd/..", 0x7ffd2796bf70)      = -1 ENOENT (No such file or directory)
root@b80c832b6dc1:/var/www/html# strace man --troff-device=html --encoding=UTF-8 ftqhasd ftqhasd\/../aaa 2>&1 | grep ftqhasd
execve("/usr/bin/man", ["man", "--troff-device=html", "--encoding=UTF-8", "ftqhasd", "ftqhasd/../aaa"], 0x7ffdf97d63a0 /* 8 vars */) = 0
stat("ftqhasd-ftqhasd/../aaa", 0x7ffd60c95f00) = -1 ENOENT (No such file or directory)
write(2, "ftqhasd-ftqhasd/../aaa", 22ftqhasd-ftqhasd/../aaa)  = 22
stat("ftqhasd_ftqhasd/../aaa", 0x7ffd60c95f00) = -1 ENOENT (No such file or directory)
write(2, "ftqhasd_ftqhasd/../aaa", 22ftqhasd_ftqhasd/../aaa)  = 22
write(2, "No manual entry for ftqhasd\n", 28No manual entry for ftqhasd
stat("/usr/local/sbin/ftqhasd", 0x7ffd60c95f60) = -1 ENOENT (No such file or directory)
stat("/usr/local/bin/ftqhasd", 0x7ffd60c95f60) = -1 ENOENT (No such file or directory)
stat("/usr/sbin/ftqhasd", 0x7ffd60c95f60) = -1 ENOENT (No such file or directory)
stat("/usr/bin/ftqhasd", 0x7ffd60c95f60) = -1 ENOENT (No such file or directory)
stat("/sbin/ftqhasd", 0x7ffd60c95f60)   = -1 ENOENT (No such file or directory)
stat("/bin/ftqhasd", 0x7ffd60c95f60)    = -1 ENOENT (No such file or directory)
stat("ftqhasd/../aaa", 0x7ffd60c95f00)  = -1 ENOENT (No such file or directory)
write(2, "ftqhasd/../aaa", 14ftqhasd/../aaa)          = 14
write(2, "No manual entry for ftqhasd/../a"..., 35No manual entry for ftqhasd/../aaa
stat("ftqhasd/../aaa", 0x7ffd60c95f60)  = -1 ENOENT (No such file or directory)
root@b80c832b6dc1:/var/www/html# strace man --troff-device=html --encoding=UTF-8 ftqhasd\/..\/aaa ftqhasd 2>&1 | grep ftqhasd
execve("/usr/bin/man", ["man", "--troff-device=html", "--encoding=UTF-8", "ftqhasd/../aaa", "ftqhasd"], 0x7ffeb36258a0 /* 8 vars */) = 0
stat("ftqhasd/../aaa-ftqhasd", 0x7ffe2aaa6d90) = -1 ENOENT (No such file or directory)
write(2, "ftqhasd/../aaa-ftqhasd", 22ftqhasd/../aaa-ftqhasd)  = 22
stat("ftqhasd/../aaa_ftqhasd", 0x7ffe2aaa6d90) = -1 ENOENT (No such file or directory)
write(2, "ftqhasd/../aaa_ftqhasd", 22ftqhasd/../aaa_ftqhasd)  = 22
stat("ftqhasd/../aaa", 0x7ffe2aaa6d90)  = -1 ENOENT (No such file or directory)
write(2, "ftqhasd/../aaa", 14ftqhasd/../aaa)          = 14
write(2, "No manual entry for ftqhasd/../a"..., 35No manual entry for ftqhasd/../aaa
stat("ftqhasd/../aaa", 0x7ffe2aaa6df0)  = -1 ENOENT (No such file or directory)
write(2, "No manual entry for ftqhasd\n", 28No manual entry for ftqhasd
stat("/usr/local/sbin/ftqhasd", 0x7ffe2aaa6df0) = -1 ENOENT (No such file or directory)
stat("/usr/local/bin/ftqhasd", 0x7ffe2aaa6df0) = -1 ENOENT (No such file or directory)
stat("/usr/sbin/ftqhasd", 0x7ffe2aaa6df0) = -1 ENOENT (No such file or directory)
stat("/usr/bin/ftqhasd", 0x7ffe2aaa6df0) = -1 ENOENT (No such file or directory)
stat("/sbin/ftqhasd", 0x7ffe2aaa6df0)   = -1 ENOENT (No such file or directory)
stat("/bin/ftqhasd", 0x7ffe2aaa6df0)    = -1 ENOENT (No such file or directory)
```