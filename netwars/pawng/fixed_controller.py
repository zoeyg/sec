#!/usr/bin/python3
import curses
import os
from scapy.all import *
import time
# =========== TODO ============== #
# Lost the original source code to send controls to 
# the right packets to the pawng game server. I need
# to fix these three functions using scapy to send
# the right kind of packets the server is expecting.
# I think I remember the server had a help menu you 
# could access if you sent the correct packet to
# 127.0.0.1 to UDP port 20 and source port 5000.
# Server responds back with menu to UDP port 5000.
def set_difficulty(GAME_DIFFICULTY="100"):
    send(IP(dst="127.0.0.1")/UDP(sport=6000, dport=53)/DNS(qr=1,qd=DNSQR(qname="difficulty.local"), an=DNSRR(rrname="difficulty.local", rdata="0")), iface="lo", verbose=False)

def paddle_up():
    send(IP(dst="127.0.20.180")/TCP(dport=20,flags="PA")/Raw(load="up"), iface="lo", verbose=False)

def paddle_down():
    send(IP(dst="127.80.1.46")/ICMP(type="echo-reply")/Raw(load="down"), iface="lo", verbose=False)

# =========== NOTE TO SELF ============== #
# Everything below this line is just interface
# stuff and shouldnt need modifying. It just
# calls the paddle_up and paddle_down functions
# once the up/down arrow keys are pressed.
UBUTTON = """
    ███████    
  ██       ██  
██     █     ██
██    ███    ██
██   █████   ██
  ██       ██  
    ███████    """[1:]
DBUTTON = """
    ███████    
  ██       ██  
██   █████   ██
██    ███    ██
██     █     ██
  ██       ██  
    ███████    """[1:]
def main():
  def animate(stdscr, rows, columns, elem, anim):
    fontattr = curses.A_DIM
    if anim:
      fontattr = curses.A_BOLD
    if not elem:
      elem = DBUTTON.split('\n')
      color_pair = curses.color_pair(2)
      center = int(columns/2)+1
    else:
      elem = UBUTTON.split('\n')
      color_pair = curses.color_pair(1)
      center = int(columns/2)-(len(elem[0])+1)
    cnt = -1
    for row in elem:
      stdscr.addstr(max(0,int(rows/2)-int(len(elem)/2)+cnt), max(0,center), row, color_pair | fontattr)
      cnt += 1
  try:
    rows, columns = [int(x) for x in os.popen('/bin/stty size', 'r').read().split()]
    stdscr = curses.initscr()
    curses.noecho()   
    curses.cbreak()
    curses.curs_set(0)
    curses.start_color()
    curses.init_pair(1, curses.COLOR_RED, curses.COLOR_BLACK)
    curses.init_pair(2, curses.COLOR_YELLOW, curses.COLOR_BLACK)
    curses.color_pair(1)
    curses.color_pair(2)
                                
    stdscr.keypad(1)                
    stdscr.border(0)
    anim_delay = 0.3
    stdscr.timeout(int(anim_delay*1000))
    PawngHeader = "WELCOME TO ELF PAWNG ARCADE"
    PawngFooter = "Press Up 🡑 Arrow To Paddle Up And Press Down 🡓 Arrow To Paddle Down."
    PawngFooter2 = 'Press q to close this screen.'
    stdscr.addstr(1, max(0,int((columns-len(PawngHeader))/2)), PawngHeader, curses.A_BOLD)
    stdscr.addstr(max(0,rows-3), max(0,int((columns-len(PawngFooter))/2)), PawngFooter, curses.A_NORMAL)
    stdscr.addstr(max(0,rows-2), max(0,int((columns-len(PawngFooter2))/2)), PawngFooter2, curses.A_NORMAL)
    animate(stdscr, rows, columns, True, False)
    animate(stdscr, rows, columns, False, False)
    uptime = time.time() + anim_delay
    dntime = time.time() + anim_delay
    while True:
      if uptime < time.time():
        animate(stdscr, rows, columns, True, False)
      if dntime < time.time():
        animate(stdscr, rows, columns, False, False)
      ch = stdscr.getch()
      if ch == ord('q'):
        break
      elif ch == curses.KEY_UP:
        animate(stdscr, rows, columns, True, True) 
        paddle_up()
        uptime = time.time() + anim_delay
      elif ch == curses.KEY_DOWN:
        animate(stdscr, rows, columns, False, True)
        paddle_down()
        dntime = time.time() + anim_delay
  except:
    pass
  finally:
    stdscr.keypad(0)
    curses.echo()
    curses.nocbreak()
    curses.endwin()
if __name__ == "__main__":
  set_difficulty()
  main()      
(END)