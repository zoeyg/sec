#ifndef THREAD_INCLUDE
#define THREAD_INCLUDE

#include <sys/socket.h>
#include <netinet/in.h>
#include <pthread.h>
#include <stdlib.h>
#include <time.h>

#include "file.h"
#include "lfm.h"
#include "log.h"
#include "params_parsing.h"

int MAX_THREADS;						// max number of spawned threads
int N_THREAD;
int alive_threads;

// struct representing a connection in the queue
struct list_t
{
	struct list_t *pnext;
	int connsd;
	char client_ip[INET_ADDRSTRLEN];		// ascii representation of client ip address
};

// length of the queue
int fifo_len;

// head of the queue
struct list_t *head;
// end of the queue
struct list_t *end;

pthread_attr_t attr;						// to create detached-threads --> thread stack automatically freed as thread dies

pthread_mutex_t mtx;						// mutex for list of connection
pthread_mutex_t mtx_working;				// mutex for increase/decrease var.: num_working_threads
pthread_mutex_t mtx_alive;					// mutex for increase/decrease var.: alive_threads
pthread_mutex_t mtx_time;					// mutex for the estimated tts (time to serve) and deviance
pthread_mutex_t mtx_error;					// mutex for error 
pthread_mutex_t mtx_cache;					// mutex for cache

pthread_cond_t connection_available;		// condition variable to advise threads when a new connection has come

int num_working_threads;					// +1 if one thread is working, -1 if it has finished 

struct thread_t
{
	pthread_t tid;
	int socketfd;

};

// mutex functions
void lock_mutex(pthread_mutex_t *m, int fd);
void unlock_mutex(pthread_mutex_t *m, int fd);
// Create a new thread
void create_new_thread(int socketfd);
void *thread_work(void *arg);
// queue managing functions
struct list_t *remove_after_node(struct list_t **ppnext);
void insert_after_node(struct list_t *item,struct list_t **pnext);
// treads functions
void create_threads(int socketfd);
void insert_request_list(int connsd, char *client_ip);
void advise_threads(int connsd);

void pthread_fatal_error(int id, const char *error_msg, int err);

#endif
