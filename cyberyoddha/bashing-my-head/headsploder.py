#!/usr/bin/env python
# -*- coding: utf-8 -*-
# This exploit template was generated via:
# $ pwn template --host cyberyoddha.baycyber.net --port 10006
from pwn import *
import re
import base64
from functools import *

ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')

# Set up pwntools for the correct architecture
context.update(arch='i386')
exe = './path/to/binary'

host = args.HOST or 'cyberyoddha.baycyber.net'
port = int(args.PORT or 10006)

def remote(argv=[], *a, **kw):
    '''Connect to the process on the remote host'''
    io = connect(host, port)
    if args.GDB:
        gdb.attach(io, gdbscript=gdbscript)
    return io

def start(argv=[], *a, **kw):
    return remote(argv, *a, **kw)

def waitTill(input, io):
    output = ''
    while(output.find(input) == -1 and output.find('p = ') == -1 and output.find('ϕ =') == -1):
        test = io.recv().decode('utf8')
        print('>>' + test + '<<')
        output += test
    return ansi_escape.sub('', output)

def factors(n):    
    return set(reduce(list.__add__, 
        ([i, n//i] for i in range(1, int(n**0.5) + 1) if n % i == 0)))

def prend(out):
    print('Sending ' + out)
    io.send(out)

def anydup(thelist):
  seen = set()
  for x in thelist:
    if x in seen: return True
    seen.add(x)
  return False

def handleQuestion(io):
    question = waitTill('Answer =', io)

    # Question 0
    if (question.find('decrypt this') != -1):
        b64stuff = re.search('this: ([\w=]+)!', question).group(1)
        decoded = base64.b64decode(b64stuff)
        print('Decrypting ' + b64stuff + ' -> ' + decoded.decode('utf8'))
        prend(decoded.decode('utf8'))

    # Question 1
    elif (question.find('p to equal') != -1):
        b64stuff = re.search('p to equal ([\w=]+)\?', question).group(1)
        decoded2 = base64.b64decode(b64stuff)
        print('Decrypting ' + b64stuff + ' -> ' + decoded2.decode('utf8'))
        n=int(decoded2.decode('utf8'))
        fs=sorted(factors(n))
        if (len(fs) > 2):
            print('Not prime')
            prend('n')
        else:
            print('prime')
            prend('y')

    # Question 2
    elif (question.find('p and q (where p < q)') != -1):
        b64stuff = re.search('hen n is ([\w=]+)!', question).group(1)
        decoded3 = base64.b64decode(b64stuff)
        print('Decrypting ' + b64stuff + ' -> ' + decoded3.decode('utf8'))
        n=int(decoded3.decode('utf8'))
        fs=sorted(factors(n))
        prend(str(fs[1]))
        print(io.recv().decode('utf8'))
        prend(str(fs[2]))

    # Question 3
    elif (question.find(' it is possible for n') != -1):
        b64stuff = re.search('n to equal ([\w=]+)!', question).group(1)
        decoded4 = base64.b64decode(b64stuff)
        print('Decrypting ' + b64stuff + ' -> ' + decoded4.decode('utf8'))
        n=int(decoded4.decode('utf8'))
        fs=sorted(factors(n))
        if (len(fs) == 4):
            prend('y')
            print(io.recv().decode('utf8'))
            prend(str(fs[1]))
            print(io.recv().decode('utf8'))
            prend(str(fs[2]))
        else:
            prend('n')

    # Question 4
    elif (question.find('me ϕ whe n is') != -1):
        b64stuff = re.search('whe n is ([\w=]+)!', question).group(1)
        decoded5 = base64.b64decode(b64stuff)
        print('Decrypting ' + b64stuff + ' -> ' + decoded5.decode('utf8'))
        n=int(decoded5.decode('utf8'))
        fs=sorted(factors(n))
        s=(fs[2] - 1) * (fs[1] - 1)
        print(s)
        prend(str(s))

    # Question 5
    elif (question.find('Is it possible for ϕ to be') != -1):
        groups = re.search('to be ([\w=]+) when e is ([\w=]+)\?', question)
        b641 = groups.group(1)
        b642 = groups.group(2)
        sb = base64.b64decode(b641)
        eb = base64.b64decode(b642)
        print('Decrypting ' + b641+ ' -> ' + sb.decode('utf8'))
        print('Decrypting ' + b642 + ' -> ' + eb.decode('utf8'))
        s=int(sb.decode('utf8'))
        ss=sorted(factors(s))
        e=int(eb.decode('utf8'))
        es=sorted(factors(e))
        af=sorted(ss+es)[1:]
        print(af)
        if (anydup(af)):
            prend('n')
        else:
            prend('y')
    else:
        return False

    return True

io = start()

while(handleQuestion(io)):
    print('Next question')

io.interactive()