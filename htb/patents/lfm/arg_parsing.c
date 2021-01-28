#include "arg_parsing.h"

void check_option(char *program_name,char *arg,char *value, int *port,char **logfilename) 	
{
	int option = 0;						// 'option' field..is OPTION_PORT or OPTION_LOG?
	option=parse_option(arg);			

	if (value == NULL || port == NULL || logfilename == NULL) {
		if (option==OPTION_HELP) {
			fprintf(stderr, "Cserver help\nUsage: %s [-p port_number] [-l logfilename.log]\n",program_name);
			exit(EXIT_SUCCESS);
		}
		fprintf(stderr,"ERROR: invalid port number.\nUsage: %s [-p port_number] [-l logfilename.log]\n",program_name);
		exit(EXIT_FAILURE);	
	}
	
	if(option==OPTION_PORT){			// get port nubmer from command line
		*port=str2int(value);			// not using cserver default port (5000)
		//printf("%d \n" ,*port);
		if((*port)==-1){
			fprintf(stderr,"ERROR: invalid port number.\nUsage: %s [-p port_number] [-l logfilename.log]\n",program_name);
			exit(EXIT_FAILURE);	
		}
	}
	else if(option==OPTION_LOG){		// get logfile name from command line
		int len = strlen(value);
		if(strncmp(value+len-4,".log", 4) == 0){
			*logfilename=value;
		}
		else{
			fprintf(stderr,"ERROR: invalid input.\nUsage: %s [-p port_number] [-l logfilename.log]\n",program_name);
			exit(EXIT_FAILURE);
		}
	}
	else{
		fprintf(stderr,"ERROR: invalid input.\nUsage: %s [-p port_number] [-l logfilename.log]\n",program_name);
		exit(EXIT_FAILURE);
	}
}

int parse_option(char *arg)
{
	
	if (strncmp(arg,"-p",2)==0)
		return OPTION_PORT;
	else if (strncmp(arg,"-l",2)==0)
		return OPTION_LOG;
	else if (strncmp(arg,"-h",2)==0)
		return OPTION_HELP;
	else 
		return -1;
}

int str2int(char *s)
{
	char *p;
	int n = 0;
	
	errno = 0;
	n = strtol(s,&p,0);
	
	if(errno!=0 || *p!='\0')
		return -1;

	return n;
}

float str2float(char *s)
{
	float n = 0;
	char *p;
	
	errno = 0;
	n = (float) strtod(s,&p);
	
	if(errno!=0 || *p!='\0')
		return -1;

	return n;
}


