#include "process.h"
                                                          
int bsem_init_busy(int bsemID)                               
{                                                            
    union semun arg;                                         
    arg.val = 0; /* in use */                                
    return semctl(bsemID, 0, SETVAL, arg);                   
}                                                            
int bsem_init_free(int bsemID)                               
{                                                            
    union semun arg;                                         
    arg.val = 1; /* free */                                  
    return semctl(bsemID, 0, SETVAL, arg);                   
}                                                            
int bsem_get(int bsemID)                                     
{                                                            
    struct sembuf sops;                                      
    sops.sem_num = 0;                                        
    sops.sem_op = -1;                                        
    sops.sem_flg = SEM_UNDO; // if the process dies before releasing the semaphore, the SO releases it                                        
    while (semop(bsemID, &sops, 1) == -1)                    
        if (errno != EINTR) /* ! interrupted by a signal */  
            return -1;                                       
    return 0;                                                
}                                                            
int bsem_put(int bsemID)                                     
{                                                            
    struct sembuf sops;                                      
    sops.sem_num = 0;                                        
    sops.sem_op = 1;                                         
    sops.sem_flg = 0;                                        
    return semop(bsemID, &sops, 1);                          
}   

int init_sem(int socketfd)
{
	int sid = semget(IPC_PRIVATE, 1, IPC_CREAT | 0666);
	if (sid == -1) 
		fatal_error(socketfd, "ERROR in semget()", errno);

	if (bsem_init_free(sid) == -1) {
		fatal_error(socketfd, "ERROR in bsem_init_free()", errno);
	}

	return sid;
}

void get_sem(int socketfd, int semid)
{
	if (bsem_get(semid) == -1)
		fatal_error(socketfd, "ERROR in get_sem()\n", errno);

}

void put_sem(int socketfd, int semid)
{
	if (bsem_put(semid) == -1) 
		fatal_error(socketfd, "ERROR in put_sem()\n", errno);

}                                                         

void sigchld_handler(int s)
{
	int status;
	pid_t pid;
	
	while ((pid=waitpid(WAIT_ANY, &status, WNOHANG)) > 0) 	// is any children dead?
		alive_children--;									// yes. One is.
		
	s=s; 													// for gcc warning: unused variable 's'
	return;												
}

void install_sigchld_handler(int socketfd)
{
	struct sigaction sa;
	
	sigemptyset(&sa.sa_mask);								// sa_mask == signals to be blocked while the signal handler is being executed
	sa.sa_flags = SA_RESTART;								// restart any interrupted system call
	sa.sa_handler = sigchld_handler;						// SIGCHLD handler
	
	if (sigaction(SIGCHLD, &sa, NULL) == -1) {
		fatal_error(socketfd, "ERROR in establishing signal handler for SIGCHLD", errno);
	}
}

void spawn_chlidren(int socketfd, int n)
{
	pid_t p;
	int i;
	
	for (i = 0; i < n; i++) {
		p = fork();
		if (p == -1) {
			fatal_error(socketfd, "ERROR in fork()", errno);
		}
		else if (p != 0) {
			alive_children++;
			continue;
		}
		else if (p == 0)
			child_work(socketfd);
	}
}

void child_work(int socketfd)
{
	int domain = AF_INET;						// choosing IPv4 protocol [else: AF_INET6(for IPv6)]
	struct sockaddr_in client_addr; 			// IPv4 client structure
	socklen_t c_addr_len = sizeof(client_addr);	// length of client_addr structureclient_addr_len = ;
	char client_ip[INET_ADDRSTRLEN];			// ascii representation of client ip address
	int client_ip_int;							// int representation of client ip address
	
	int connsd = 0;								// socketfd returned by accept, used to communicate with client		

	struct timeval timeout;						// timeout for read() from connsd
	timeout.tv_sec = 5;
	timeout.tv_usec = 0;

	// load values from configuration file
	N_THREAD = param_config.nums_of_threadsPerProcess;			// var in thread.h
	MAX_THREADS = param_config.max_nums_of_threadsPerProcess;	// var in thread.h

	// printf("N_THREAD: %d, MAX_THREADS: %d\n", N_THREAD, MAX_THREADS);
	system_log(LOG_INFO, "N_THREAD: %d, MAX_THREADS: %d\n", N_THREAD, MAX_THREADS);

	// create threads
	create_threads(socketfd);
	alive_threads = N_THREAD;
	// set lfm module error function to pthread_fatal_error
	lfm_init(&pthread_fatal_error);
	
	// main server loop
	while (1) {
		get_sem(socketfd, accept_sem_id);						// get semaphore before accept()
		connsd = accept(socketfd, (struct sockaddr *) &client_addr, &c_addr_len);
		put_sem(socketfd, accept_sem_id);						// release semaphore before accept()
		
		if (connsd == -1) {
			fatal_error(socketfd, "ERROR in accept()", errno);
		}
		
		// Convert the client IPv4 structure to human readable string
		client_ip_int = client_addr.sin_addr.s_addr;
		if (inet_ntop(domain, &client_ip_int, client_ip, INET_ADDRSTRLEN) == NULL) {
			fprintf(stdout,"ERROR in inet_ntop(). Cannot convert client IPv4 address\n");
			system_log(LOG_WARNING, "ERROR in inet_ntop(). Cannot convert client IPv4 address (%s)\n", strerror(errno));
		}
		
		// printf("Client connected: %s\n", client_ip != NULL ? client_ip : "unknown IP");
		system_log(LOG_DEBUG, "Client connected: IP = %s\n", client_ip != NULL ? client_ip : "unknown IP");

		// add timeout to read operation from connsd
		if (setsockopt(connsd, SOL_SOCKET, SO_RCVTIMEO, &timeout, sizeof(timeout)) == -1) {
			system_log(LOG_WARNING, "Unable to set timeout for connsd\n");
		}
		
		// insert the current connection in the queue
		insert_request_list(connsd,client_ip);
		
		// create a new thread if all (old) threads are busy
		if (pthread_mutex_lock(&mtx_working) != 0) {
			fatal_error(socketfd, "ERROR in pthread_mutex_lock() [child_work]", errno);
		}
			
		if (num_working_threads == alive_threads && alive_threads <= MAX_THREADS){
			if (pthread_mutex_unlock(&mtx_working) != 0) {
				fatal_error(socketfd, "ERROR in pthread_mutex_unlock() [child_work]", errno);
			}
			log_info("Creating a new thread \n");
			create_new_thread(socketfd);
		}
		else {
			if (pthread_mutex_unlock(&mtx_working) != 0) {
				fatal_error(socketfd, "ERROR in pthread_mutex_unlock() [child_work]", errno);
			}
		}
		advise_threads(connsd);
	}
}
