#!/usr/bin/env python3

import sys
sys.path.insert(0, './api')
sys.path.insert(0, './web')

from api import server as api_server
from web import server as web_server

import threading, random

if __name__ == '__main__':
    backend_port = random.randint(50000, 51000)

    at = threading.Thread(target = api_server.start, args = (50528,))
    wt = threading.Thread(target = web_server.start, args = (50528,))

    at.daemon = True
    wt.daemon = True

    at.start()
    wt.start()

    at.join()
    exit() # something is wrong
    wt.join()
    exit() # something is wrong
