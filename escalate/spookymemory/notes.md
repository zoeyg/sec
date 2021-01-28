# Spookymemory
## pcap file
Lots of ping requests.  We see that they're from an intranet address to 8.8.8.8 which is a google DNS server so we're assuming the outgoing requests are what we're looking for.  They're all zeroed out.  The only thing that differs is the timing.

## Script to extract data
Use the script to look at the difference in timings and we see that they're pretty much 0 or 0.5, so we create 0s and 1s from that data.  We can then convert that data into hex of `b3b9b4b28aaeedb7b7e5ece2e4b6e0b6ede4e1e6ece1b7e7b7b3b1b3e4b6b1e4e1ede7e0e5b0a8`.

## Decryption
Dropping that into cyberchef and brute-forcing XOR encryption we find that the key is `d5` and we get the flag.

https://gchq.github.io/CyberChef/#recipe=From_Hex('Auto')XOR(%7B'option':'Hex','string':'d5'%7D,'Standard',false)&input=YjNiOWI0YjI4YWFlZWRiN2I3ZTVlY2UyZTRiNmUwYjZlZGU0ZTFlNmVjZTFiN2U3YjdiM2IxYjNlNGI2YjFlNGUxZWRlN2UwZTViMGE4