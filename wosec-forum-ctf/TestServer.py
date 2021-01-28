import socket
import hashlib

#Use to replace current bitcoin test tool in the future?
class TestServer:
    def __init__(self, port):
        self.port=port
        self.sock = socket.socket()
        hn = socket.gethostname()
        self.host = socket.gethostbyname(hn)
    
    def fact_check(self, block):
        #TO DO: make this function make an API call
        return

    def run(self):
        self.sock.bind((self.host, self.port))
        self.sock.listen(5)
        conn, addr = self.sock.accept()
        #TO DO Remove Me:
        admin_passphrase = "79fd7d4d34de9d5368c6b15091c29047"
        conn.send(b'Bitcoin Address Exchange Test Tool\n\nEnter Passphrase:')
        data = conn.recv(1024)
        data_str = str(data.decode('utf-8'))
        print(data_str)
        #Parse the passphrase to create the password:
        #Using SSH password, will try to merge with existing protocol for more "legitimate" authentication
        data_pass = ''.join(x[0] for x in data_str.split('\n'))
        m = hashlib.md5()
        m.update(data_pass.encode('utf-8'))
        pass_hash = m.hexdigest()
        if pass_hash != admin_passphrase:
            conn.send(b'Authentication Failed.')
        else:
            conn.send(b'Authentication Success.')
            while(1):
                data = conn.recv(1024)
                data_str = str(data.decode('utf-8'))
                if data_str=='q':
                    break
                else:
                    self.fact_check(data_str)
                    conn.send(b'Success.')
        conn.close()
        self.sock.close()

if __name__ == "__main__":
    server = TestServer(3333)
    server.run()