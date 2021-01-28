#ifndef LFM_INCLUDE
#define LFM_INCLUDE

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/tcp.h>
#include <fcntl.h>
#include <errno.h>
#include <unistd.h>
#include <math.h>
#include <time.h>
#include <alloca.h>
#include <sys/sendfile.h>

#include "file.h"
#include "socket_io.h"
#include "thread.h"
#include "log.h"
#include "params_parsing.h"
#include "md5.h"

#define MAX_FILENAME_SIZE 128   // [PUT] avoid file names longer than that
#define MAX_OBJECT_SIZE 10*1024 // [PUT] DON'T HANDLE FILES BIGGER THAN THAT

//minimum number of lines
#define MIN_LINE_NUMBER 8

#define CHECK 1
#define GET 2
#define PUT 4

/* error function to use in module functions */
void (*fileManager_error)(int id, const char *error_msg, int err);

extern struct params_configuration params_config;

struct msg
{
	int connsd;						// connection socket
	char *client_ip;				// IP address of the client
	char **message;					// message received (array of lines)
	char *body;                     // request body
	size_t nlines;					// read lines
	int method;						// CHECK or GET or ...
	char *object;					// object requested
	char *o_nodir;					// object path without path sequence
	char *o_noext;					// object path without extension
	char *extension;				// object extension
	char *user;						// user (for authenticated methods)
	char *pass;						// password (for authenticated methods)
};

// server root
char *root;

// First lines for response headers
char *bad_request;
char *get_header;
char *file_not_found;
char *md5_not_match;
char *internal_error;
char *unauthorized;

void lfm_init(void (*error_fcn)(int id, const char *error_msg, int err));
void url_decode(char* src, char* dest, int max);
void free_struct(struct msg *p);
void free_message(struct msg *p);
void free_object(struct msg *p);
void send_bad_request(int connsd);
void send_401(int connsd);
void send_404(int connsd);
void send_406(int connsd, char *md5);
void send_500(int connsd);
int parse_line(int connsd,char *line, struct msg *msg);
char *parse_object(struct msg *msg);
int parse_method(int connsd,char *line, struct msg *msg);
struct msg *read_message(int connsd);
int send_header(char *first_line, struct msg *msg);
int handle_get(struct msg *msg);
int handle_check(struct msg *msg);
int handle_put(struct msg *msg, struct params_configuration *param, size_t max_size);
int handle_lfm_connection(int connsd, char *ip);


#endif
