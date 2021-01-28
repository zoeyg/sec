#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <errno.h>
#include <time.h>
#include <math.h>

#include <syslog.h>

#include <sys/sysinfo.h>

#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <arpa/inet.h>

#include "params_parsing.h"
#include "arg_parsing.h"
#include "log.h"
#include "file.h"
#include "process.h"
#include "socket_io.h"
#include "lfm.h"
#include "thread.h"

// in Linux backlog identifies the length of the accepted connections queue to prevent SYNFLOOD; max backlog length is SOMAXCONN
#define BACKLOG SOMAXCONN

int logfile;

volatile sig_atomic_t alive_children;
