# graygrowth
## pcap file
We see lots of ping requests.  Some have data.  There's also some timing differences going on.

## script to extract data (process.py)
Extracting the data we get `2317fdf4488866dbf2e74eeb2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a12317fdf4488866dbf2e74eeb` and parsing the timings we get `9694010911501622`.  

## theories
There's a part of the data that repeats.
* Perhaps that part is a key or initialization vector?
* Perhaps that's because there was a smaller amount of data than the number of requests required to transmit the timing data.
Perhaps the timing data is an initialization vector for some type of encryption

40