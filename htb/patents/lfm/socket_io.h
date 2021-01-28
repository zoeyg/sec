#ifndef SOCKET_IO_INCLUDE
#define SOCKET_IO_INCLUDE

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/time.h>
#include <unistd.h>
#include <errno.h>
#include "file.h"

//minimum line lenght;
#define MIN_LINE_SIZE 64
//for reading files by blocks 
#define READ_BLOCK_BYTE 128

//void send_file(int connsd,int fd, void (*error)(int id, const char *error_msg));
int write_message(int connsd, char *msg, size_t nleft);
//int read_n(int connsd, size_t n, char *buf, void (*error)(int id, const char *error_msg));
int select_and_timer (int fd);
char *read_line(int connsd, void (*error)(int id, const char *error_msg, int err));

// #include "socket_io.c"

#endif
