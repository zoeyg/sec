from scapy.all import *

packets = rdpcap('capture.pcap')

last_timestamp = 0
prev_sql = ''
database_name = ''
table_name = ''
column_name = ''
user = ''
password = ''
for packet in packets:
  try:
    timestamp = packet[2].options[2][1]
  except:
    timestamp = 0
  if 'SELECT SLEEP' in str(packet):
    start = bytes(packet).find(b'SELECT SLEEP')
    end = bytes(packet).find(b'* 3)') + 4
    sql = bytes(packet)[start:end]
    diff = timestamp[0] - last_timestamp
    bit = ''
    if diff > 1500:
      print('*:' + prev_sql)
      bit = '1'
    else:
      print('-:' + prev_sql)
      bit = '0'

    if (prev_sql.find('database_name') > 0):
      database_name += '1' if diff > 1500 else '0'
    if (prev_sql.find('table_name') > 0):
      table_name += '1' if diff > 1500 else '0'
    if (prev_sql.find('column_name') > 0):
      column_name += '1' if diff > 1500 else '0'
    if (prev_sql.find('user') > 0):
      user += '1' if diff > 1500 else '0'
    if (prev_sql.find('password') > 0):
      password += '1' if diff > 1500 else '0'
    last_timestamp = timestamp[0]
    prev_sql = sql.decode('utf8')


print('db_name: ' + database_name)
print('table_name: ' + table_name)
print('column_name: ' + column_name)
print('user: ' + user)
print('password: ' + password)

pw = ''
pw_chunks = [password[i:i+8] for i in range(0, len(password), 8)]
for chunk in pw_chunks:
  pw += chr(int(chunk, 2))
print('FLAG! -> ' + pw)