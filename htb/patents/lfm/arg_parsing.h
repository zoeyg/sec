#ifndef ARG_PARSING_INCLUDE
#define ARG_PARSING_INCLUDE

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>

#define OPTION_PORT 1
#define OPTION_LOG 2
#define OPTION_HELP 3


//verify comaptibility matching (option_port,port_number) and (option_log,logfilename)
void check_option(char *program_name,char *arg,char *value, int *port,char **logfilename);	
//return an integer corresponding to the given command line option
int parse_option(char *arg);
//parsing string to integer
int str2int(char *s);
//parsing string to float
float str2float(char *s);

#endif
