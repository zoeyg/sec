from scapy.all import *

def readPackets():
	capture = rdpcap('./graygrowth.pcap')
	lastPacketTime = None
	hexOutput = ''
	onesAndZeros = ''
	chkSumHex = ''
	for packet in capture:
		if packet[ICMP].type == 8: # 0 for reply, 8 for request
			if hasattr(packet, 'load'):
				hexOutput += packet.load.encode('hex')
				if lastPacketTime is not None:
					diff = packet.time - lastPacketTime
					if (diff < 0.25):
						onesAndZeros += '0'
					else:
						onesAndZeros += '1'
				ckHex = ('%x' % packet[ICMP].chksum)[:-2]
				if len(ckHex) == 1:
					ckHex = '0' + ckHex
				chkSumHex += ckHex
			lastPacketTime = packet.time
	return hexOutput, onesAndZeros, chkSumHex

def chunkstring(string, length):
    return (string[0+i:length+i] for i in range(0, len(string), length))

def convertChar(string):
	number = int(string, 2)
	if (number != 0):
		return chr(int(string, 2))
	return ' '

def reverseString(string):
	return string[::-1]

def extractRepeated(string):
	repeated = string[:24]
	remaining = string.replace(repeated, '')
	return repeated, remaining

# filter packets and convert to hex string
# hexString, rawLoad, onesAndZeroes = readPackets()
hexString, onesAndZeros, chkSumHex = readPackets()
print list(chunkstring(onesAndZeros, 8))
# ['10010110', '10010100', '00000001', '00001001', '00010001', '01010000', '00010110', '00100010']
print "%x" % int(onesAndZeros, 2)
# 9694010911501622
print chkSumHex
# print ''.join(reversed(splitHex))

timingHexReverse = '696bfef6eeafe9dd'
timingHex = '9694010911501622' # 8 bytes - 64 bit
hexString = '2317fdf4488866dbf2e74eeb2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a12317fdf4488866dbf2e74eeb'
woRepeatedEnd = '2317fdf4488866dbf2e74eeb2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1'
middlePiece = '2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1'
endPiece = '2317fdf4488866dbf2e74eeb' # 12 bytes - 96 bit
chkSumHex = 'd4e0fa03af6f911c0510a90cd1721b86c433581ce1a6b8bda5eaca2397ab3f69f6a1ffd4ef3f97e17bee5eb374413eb4cf4ad456d4e0fa03af6f911c0510a90c'

