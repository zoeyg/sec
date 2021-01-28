col@pwnable:/tmp/zo$ echo -en '\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe8\x05\xd9\x1d' > col-in
col@pwnable:/tmp/zo$ cat col-in 
��col@pwnable:/tmp/zo$ 
col@pwnable:/tmp/zo$ ~/col $(cat col-in)
/bin/cat: flag: No such file or directory
col@pwnable:/tmp/zo$ cd ~
col@pwnable:~$ ./col $(cat /tmp/zo/col-in)
daddy! I just managed to create a hash collision :)