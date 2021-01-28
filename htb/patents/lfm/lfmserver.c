#include "lfmserver.h"

volatile sig_atomic_t alive_children = 0;

int main(int argc, char *argv[])
{
	int port = param_config.port;				//default cserver port: 5000
	int p1 = 0;									//user give port from command line?
	char *logfilename = param_config.log_file;
	int socketfd = 0;							// socket file descriptor
	int domain = AF_INET;						// choosing IPv4 protocol [else: AF_INET6(for IPv6)]
	struct protoent *protocol = NULL;			// structure field 'p_proto' = TCP protocol number
	struct sockaddr_in addr; 					// sockaddr_in is the IPv4 address struct
	int reuse_addr = 1;

	// parse command line arguments:
	if (argc == 2)
		check_option(argv[0],argv[1],NULL,NULL,NULL);
	else if(argc==3)
		check_option(argv[0],argv[1],argv[2],&p1,&logfilename);
	else if(argc==5) {
		check_option(argv[0],argv[1],argv[2],&p1,&logfilename);
		check_option(argv[0],argv[3],argv[4],&p1,&logfilename);
	}
	else if (argc==2 || argc==4 || argc>5){
		fprintf(stderr,"Usage: %s [-p port_number] [-l logfilename.log]\n",argv[0]);
		exit(EXIT_FAILURE);
	}

	//opening log file and redirecting to STDERR
	logfile = openfile_low(logfilename, O_WRONLY|O_CREAT|O_TRUNC,0644);
	redirect(STDERR_FILENO,logfile);

	log_init("lfmserver");
	//parsing configuration file
	parse_config_file(param_config.config_file);
	// load values from configuration file
	if (p1 == 0)
		port=param_config.port;
	else
		port = p1;
	N_CHILD = param_config.nums_of_children;
	perc_dead_child = param_config.percentage_of_deadChildren;			// % of dead children before re-forking (40%)

	// START logging
	system_log(LOG_INFO, "Server starting on port %d. Logfile = %s\nNumber of children: %d\n", port, logfilename, N_CHILD);
	system_log(LOG_INFO, "perc_dead_child: %f\n", perc_dead_child);

	// socket() : setup
	protocol=getprotobyname("tcp");
	if(protocol==NULL){
		fprintf(stdout,"ERROR getting tcp protocol number \n"); 	//update logging
		system_log(LOG_ERR, "ERROR in getting tcp protocol number (%s)\n", strerror(errno));
		closefile_low(logfile);
		exit(EXIT_FAILURE);
	}
	// socket(): creating the socket
	socketfd = socket(domain,SOCK_STREAM,protocol->p_proto);		//SOCK_STREAM <--> TCP; 0 <--> default
	if(socketfd == -1){
		fprintf(stdout,"ERROR creating socket. errno = %d \n" , errno); //update logging
		system_log(LOG_ERR, "ERORR creating socket (%s)\n", strerror(errno));
		closefile_low(logfile);
		exit(EXIT_FAILURE);
	}
	//  update logging
	system_log(LOG_DEBUG, "socket created (fd=%d) \n", socketfd);

	// for using the same port,when the server dies.
	if (setsockopt(socketfd,SOL_SOCKET,SO_REUSEADDR,&reuse_addr,sizeof(reuse_addr))==-1){
		fprintf(stdout,"ERROR re-using socket. errno = %d \n" , errno); //update logging
		system_log(LOG_ERR, "ERROR in setting SO_REUSEADDR option (%s)\n", strerror(errno));
		closefile_low(logfile);
		exit(EXIT_FAILURE);
	}

	// bind(): set up
	// fill the structure with zeroes
	memset((void *)&addr,0,sizeof(addr));
	// use AF_INET family
	addr.sin_family = domain;
	//  bind: htonl-> convertes (32bit argument) from HOST byte order to NETWORK byte order
	addr.sin_addr.s_addr = htonl(INADDR_ANY); 	//INADDR_ANY sets the local IP address (32 bit long);
	addr.sin_port = htons(port);
	// bind(): binding socket to IP address and port
	if(bind(socketfd, (struct sockaddr *)&addr, sizeof(addr))==-1){
		fprintf(stdout,"ERROR in bind. errno = %d \n" , errno); //update logging
		system_log(LOG_ERR, "ERROR in bind() (%s)\n", strerror(errno));
		closefile_low(logfile);
		exit(EXIT_FAILURE);
	}

	// update logging file
	system_log(LOG_DEBUG, "socket bind() OK\n");

	// listen()
	if (listen(socketfd, BACKLOG) == -1) {
		fprintf(stdout,"ERROR in listen. errno = %d \n" , errno); //update logging
		system_log(LOG_ERR, "ERROR in listen (%s)\n", strerror(errno));
		closefile_low(logfile);
		exit(EXIT_FAILURE);
	}
	// update logging file
	system_log(LOG_DEBUG, "listen() went ok. BACKLOG=%d\n", BACKLOG);

	// initialize semaphore for accept() synchronization
	accept_sem_id = init_sem(socketfd);
	// fork children
	spawn_chlidren(socketfd, N_CHILD);
	// handle any SIGCHLD signal
	install_sigchld_handler(socketfd);

	int p;

	// Wait for children to die
	while (1) {
		p = pause();
		if (p == -1 && errno == EINTR) {
			// printf("One child dead T.T \n");
			system_log(LOG_WARNING, "One child is dead\n");
			// if more than perc_dead_child children are dead, re-fork()
			if ((N_CHILD-alive_children) >= (int) floor(perc_dead_child*N_CHILD)) {
				// printf("Re-forking %d processes\n", N_CHILD-alive_children);
				system_log(LOG_INFO, "Re-forking %d processes\n", N_CHILD-alive_children);
				spawn_chlidren(socketfd, N_CHILD-alive_children);
			}
		}
		else
			fatal_error(socketfd, "ERROR in pause()", errno);
	}

	// NEVER REACHED
	closefile_low(logfile);
	closelog();
	return EXIT_SUCCESS;
}
