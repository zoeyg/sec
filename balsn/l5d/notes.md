docker run -it --rm --name l5d-test -v "$PWD":/usr/src/myapp -w /usr/src/myapp php:7.0.33-alpine-cli php payload.php

# L5D_Command

## __wakeup

session[name] set to random

## __toString

prints $cmd

## __destruct

Needs to be called after serialization finishes, checks is_unser_finished, runs system with $cmd

# L5D_Login

## __wakeup

get /flag contents and compare sha256 to $_GET['p4ssw0rd'], if success, set session[name] to wubalubadubdub

## __destruct

unsets session[name]

# L5D_SayMyName

Just prints session[name] in wakeup and destruct, __wakeup will reset to random if it's not set

