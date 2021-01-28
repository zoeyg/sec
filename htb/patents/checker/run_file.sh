#!/bin/bash

echo $(date) > /opt/checker_runned

FOLDER=/var/www/html/docx2pdf
FILE=/var/www/html/docx2pdf/convert.php

#export PASSWORD="!gby0l0r0ck\$\$!"

NEWFILE=$(python checker.py 10.100.0.1:8888 lfmserver_user PASSWORD $FILE)

#echo "Res: $NEWFILE"
#exit
if [ -z $NEWFILE ]; then
    echo "File not corrupted."
    exit
fi

if [ -f $NEWFILE ]; then
   echo "File corrupted. Copying new file..."
   cp $NEWFILE $FILE
   if [ $? -ne 0 ]; then
       echo "Couldn't restore file"
   else
       echo "File restored successfully"
       rm -f $NEWFILE
   fi
else
   echo "File not corrupted. Not doing anything"
fi

