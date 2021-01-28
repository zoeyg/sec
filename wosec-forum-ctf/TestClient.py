import socket

class TestClient:
    def __init__(self, port):
        self.port = port
        self.sock = socket.socket()
        self.host = socket.gethostname()
    
    def send_pass_file(self, path):
        with open(path, 'r') as f:
            file_txt = f.read()
        print(file_txt)
        self.sock.send(file_txt.encode())
        resp = self.sock.recv(1024)
        print(str(resp.decode('utf-8')))

    def run(self, host):
        self.sock.connect((host, self.port))
        data = self.sock.recv(1024)
        data_str = str(data.decode('utf-8'))
        print(data_str)
        if(data_str):
            self.send_pass_file('passphrase_test_file.txt')
        self.sock.send(b'CLOSING CONNECTION')
        self.sock.send(b'q')
        self.sock.close()

if __name__ == "__main__":
    client = TestClient(3333)
    client.run()