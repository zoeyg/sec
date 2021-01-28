#!/bin/bash

typeset -i pwinc=$(cat pw-inc)
pwinc=$((pwinc+1))
(echo Fabricorp01; echo "np${pwinc}-"; echo "np${pwinc}-") | smbpasswd -U tlavel -r 10.10.10.193
printf "$pwinc" > pw-inc
echo "np$pwinc-"