#include "thread.h"

struct list_t *head = NULL;
struct list_t *end = NULL;

int fifo_len = 0;

int num_working_threads = 0;

unsigned adaptive = 0;
double tts = 0.0;
double deviance = 0.0;
float a = 0.125; // (1-a)*media + a*valore_nuovo
float b = 0.25;

float c = 0.5;	
double increment = 0;	

double waiting = 0.0;
double deviance_waiting = 0.0;
float a1 = 0.125;
float b1 = 0.25;


void lock_mutex(pthread_mutex_t *m, int fd)
{
	if (pthread_mutex_lock(m) != 0)
		pthread_fatal_error(fd, "ERROR in pthread_mutex_lock", errno);
}
void unlock_mutex(pthread_mutex_t *m, int fd)
{
	if (pthread_mutex_unlock(m) != 0)
		pthread_fatal_error(fd, "ERROR in pthread_mutex_unlock", errno);
}

struct list_t *remove_after_node(struct list_t **ppnext)
{
    struct list_t *d = *ppnext;
    *ppnext = d->pnext;

    return d;
}

void insert_after_node(struct list_t *item,struct list_t **pnext)
{
    item->pnext = *pnext;
    *pnext = item;

}

void *thread_work(void *arg)
{
	struct thread_t *t = (struct thread_t *)arg;
	
	int socketfd = t->socketfd;
	int connsd=0;
	
	/* timer: if thread is idle for more than tv_sec seconds then auto-kill */
	struct timespec timeout;
	timeout.tv_sec = 60;
	timeout.tv_nsec = 0;
	int ret_value = 0;		// Return value for pthread_cond_timedwait

	while(1) {
		// Get mutex before modifying the queue
		lock_mutex(&mtx, socketfd);

		// if there is an element in the list serve it
		// else if there isn't, wait for a new connection to come
		while (head == NULL) {
			// timer is ABSOLUTE TIME, not relative
			timeout.tv_sec = time(NULL) + 60;
			// Wait on the condition variable
			if ((ret_value = pthread_cond_timedwait(&connection_available, &mtx, &timeout)) != 0) {
				if (ret_value != ETIMEDOUT) {
					pthread_fatal_error(socketfd, "ERROR in pthread_cond_wait()", errno);
				} else {
					if (alive_threads > N_THREAD) {
						log_info("Thread no more needed... auto-killing (alive_threads: %d)", alive_threads-1);
						// Unlock mutex locked for pthread_cond_wait
						unlock_mutex(&mtx, socketfd);
						// Lock mutex for decreasing alive_threads
						lock_mutex(&mtx_alive, socketfd);
						// Decrease alive_threads
						alive_threads--;
						// Unlock mutex for alive_threads
						unlock_mutex(&mtx_alive, socketfd);
						// exit
						pthread_exit(NULL);
						
					}
				}
			}
		}
			
		connsd = head->connsd;
		char *ip = strndup(head->client_ip, INET_ADDRSTRLEN+1);
		
		free(remove_after_node(&head));

		// decrease queue length by 1
		fifo_len--;

		// release the mutex for queue access
		unlock_mutex(&mtx, connsd);

		// lock mutex for num_working_threads
		lock_mutex(&mtx_working, connsd);
		// update num_working_threads
		num_working_threads+=1;
		// release mutex
		unlock_mutex(&mtx_working, connsd);

		// handle the connection
		handle_lfm_connection(connsd, ip);

		// close socket
		closefile_low(connsd);
		
		// lock mutex for num_working_threads
		lock_mutex(&mtx_working, socketfd);
			
		num_working_threads-=1;

		unlock_mutex(&mtx_working, socketfd);
		
	}
	
	return NULL;
}


void create_threads(int socketfd)
{
	int i;
	struct thread_t *p = malloc(N_THREAD*sizeof(struct thread_t));
		
	if (p == NULL)  
		pthread_fatal_error(socketfd,"ERROR in malloc() [create_threads]", errno);
		
	if (pthread_mutex_init(&mtx,NULL) != 0)
		pthread_fatal_error(socketfd,"ERROR in pthread_mutex_init(1)", errno);
	
	if (pthread_mutex_init(&mtx_working,NULL) != 0)
		pthread_fatal_error(socketfd,"ERROR in pthread_mutex_init(2)", errno);
		
	if (pthread_mutex_init(&mtx_alive,NULL) != 0)
		pthread_fatal_error(socketfd,"ERROR in pthread_mutex_init(3)", errno);

	if (pthread_mutex_init(&mtx_error,NULL) != 0)
		pthread_fatal_error(socketfd,"ERROR in pthread_mutex_init(4)", errno);

	if (pthread_mutex_init(&mtx_time,NULL) != 0)
		pthread_fatal_error(socketfd,"ERROR in pthread_mutex_init(5)", errno);

	if (pthread_mutex_init(&mtx_cache,NULL) != 0)
		pthread_fatal_error(socketfd,"ERROR in pthread_mutex_init(6)", errno);
		
	if (pthread_cond_init(&connection_available,NULL) != 0)
		pthread_fatal_error(socketfd,"ERROR in pthread_cond_init()", errno);
	
	if (pthread_attr_init(&attr) != 0)
		pthread_fatal_error(socketfd,"ERROR in pthread_attr_init", errno);
	
	if (pthread_attr_setdetachstate(&attr,PTHREAD_CREATE_DETACHED) != 0)
		pthread_fatal_error(socketfd,"ERROR in pthread_attr_setdetachstate", errno);
				
	for (i=0; i<N_THREAD; i++){
		p[i].socketfd = socketfd;
		if (pthread_create(&p[i].tid,&attr,&thread_work,&p[i]) != 0) 
			pthread_fatal_error(socketfd,"ERROR in pthread_create()", errno);
		
	}
}

void create_new_thread(int socketfd)
{
	struct thread_t *p = malloc(sizeof(struct thread_t)); 

	if (p == NULL)  
		pthread_fatal_error(socketfd,"ERROR in malloc() [create_new_thread]", errno);

	p->socketfd = socketfd;

	if (pthread_create(&p->tid,&attr,&thread_work,p) != 0) 
		pthread_fatal_error(socketfd,"ERROR in pthread_create() [create_new_thread]", errno);

	// Get mutex before modifying alive_threads
	lock_mutex(&mtx_alive, socketfd);
		
	alive_threads++;

	unlock_mutex(&mtx_alive, socketfd);

}


void insert_request_list(int connsd, char *client_ip)
{
	struct list_t *item = malloc(sizeof(struct list_t));
	if (item == NULL) 
		pthread_fatal_error(connsd, "ERROR in malloc() [insert_request_list]", errno);
	
	item->pnext = NULL;
	item->connsd = connsd;
	strncpy(item->client_ip, client_ip, INET_ADDRSTRLEN);
	
	// Get mutex before modifying the connections queue
	lock_mutex(&mtx, connsd);

	struct list_t **pp = &head;
	struct list_t *i;
	
	// going to the end of the list
	for (i=head; i != NULL; pp=&i->pnext,i=i->pnext);		
	// FIFO : item always inserted at the end of the list
	insert_after_node(item, pp);
	
	fifo_len++;
	
	unlock_mutex(&mtx, connsd);
	
}


void advise_threads(int connsd)
{
	if (pthread_cond_signal(&connection_available) != 0)
		pthread_fatal_error(connsd, "ERROR in pthread_cond_signal", errno);
}

void pthread_fatal_error(int id,const char *error_msg, int err)
{
	if (pthread_mutex_lock(&mtx_error) != 0) {
		system_log(LOG_ERR, "ERROR in pthread_mutex_lock [pthread_fatal_error]\n");
		exit(EXIT_FAILURE);
	}
	char error[256];

    if (err == 0) {
        system_log(LOG_ERR, "%s\n", error_msg);
    } else {
	    strerror_r(err, error, sizeof(error));
	    system_log(LOG_ERR, "%s (%s)\n", error_msg, error);
    }

	closefile_low(logfile);
	closefile_low(id);
	
	closelog();

	if (pthread_mutex_unlock(&mtx_error) != 0) {
		system_log(LOG_ERR, "ERROR in pthread_mutex_unlock [pthread_fatal_error]\n");
		exit(EXIT_FAILURE);
	}
		
	exit(EXIT_FAILURE);
}
