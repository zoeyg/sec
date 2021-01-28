#ifndef PROCESS_INCLUDE
#define PROCESS_INCLUDE

#include <sys/types.h>
#include <sys/wait.h>
#include <sys/ipc.h>
#include <sys/shm.h>
#include <unistd.h>
#include <sys/sem.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <signal.h>
#include <syslog.h>
#include "log.h"
#include "file.h"
#include "lfm.h"
#include "thread.h"
#include "params_parsing.h"

// union for semaphores (System V IPC)
union semun {                                                
    int val;                                                 
    struct semid_ds *buf;                                    
    unsigned short *array;                                   
}; 

int N_CHILD;
float perc_dead_child;

int accept_sem_id;			// accept() synchronization

extern volatile sig_atomic_t alive_children;		

// Functions to manage binary semaphores made with System V API
int bsem_init_busy(int bsemID);
int bsem_init_free(int bsemID);
int bsem_get(int bsemID);      
int bsem_put(int bsemID);

void sigchld_handler(int s);
void install_sigchld_handler(int socketfd);
//void get_shared_memory(int socketfd);
//void free_shared_memory(int socketfd);
// API to System V sems
int init_sem(int socketfd);
void get_sem(int socketfd, int semid);
void put_sem(int socketfd, int semid);
// fork n children
void spawn_chlidren(int socketfd, int n);
void child_work(int socketfd);

#endif
