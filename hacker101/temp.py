import sys

print('SELECT password FROM admins WHERE username=\'%s\'' % sys.argv[1].replace('%', '%%'))