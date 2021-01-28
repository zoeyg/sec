#ifndef FILE_INCLUDE
#define FILE_INCLUDE 

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <unistd.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <fcntl.h>

#include "process.h"
#include "log.h"

extern int logfile;

extern struct mem_t *mem;

//opening/closing file
FILE *openfile(char *filename,char *mode);
void closefile(FILE *f);

//fatal_error: print error and close file;
void fatal_error(int id, const char *error_msg, int err);

//opening/closing file LOW LEVEL!
int openfile_low(char *filename,int flags,mode_t mode);
void closefile_low(int fd);

//redirect from on to
void redirect(int from,int to);


// #include "file.c"

#endif
