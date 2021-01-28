#include "params_parsing.h"

struct params_configuration param_config = {.nums_of_children=4,
 											.nums_of_threadsPerProcess=1, 
											.max_nums_of_threadsPerProcess=5, 
											.percentage_of_deadChildren=0.2, 
											.port=5000,
											.log_file="lfmserver.log",
											.config_file="/etc/lfmserver/lfmserver.conf",
											.authorized_user="lfmserver_user",
											.authorized_pass="lfmserver_password"}; 


struct params_configuration parse_config_file(char *filename)
{	
	FILE *f;
	char *line; 
	char *name,*p,*value;
	float n;

	f = fopen(filename, "r");
	if (f == NULL) {
		system_log(LOG_WARNING, "Unable to find configuration file /etc/cserver/cserver.conf, using default configuration");
		return param_config;
	}
	
	line = malloc(sizeof(char)*256);
	if (line==NULL) {
		log_error("ERROR allocating string (malloc) in function: parse_config_file; errno:%d",errno);
		exit(EXIT_FAILURE);
	}
	
	// Until the file is not finished
	while (feof(f) == 0) {
		// get a new line
		line=fgets(line,256,f);
		if (line == NULL) {
			if (feof(f) ==0) {
				log_error("ERROR getting params from configuration file. errno: %d",errno);
				exit(EXIT_FAILURE);
			}
			else break;
		}
		name = strtok_r(line,"=",&p);
		value = strtok_r(NULL,"\n",&p);
		
		if (name == NULL || value == NULL) {
			log_error("Error in function parse_config_file (in strtok); Using default params configuration");
			return param_config;
		}

		n = str2float(value);
			
		if (strncmp(name,"NumberOfChildren",strlen("NumberOfChildren")) == 0 )
			param_config.nums_of_children = (int) n;
		else if (strncmp(name,"NumberOfThreadsPerProcess",strlen("NumberOfThreadsPerProcess")) == 0 )
			param_config.nums_of_threadsPerProcess = (int) (n != 0) ? n : 1;
		else if (strncmp(name,"MaxNumberOfThreadsPerProcess",strlen("MaxNumberOfThreadsPerProcess")) == 0 )
			param_config.max_nums_of_threadsPerProcess = (int) (n != 0) ? n : 1;
		else if (strncmp(name,"PercentageOfDeadChildren",strlen("PercentageOfDeadChildren")) == 0 )
			param_config.percentage_of_deadChildren = n;
		else if (strncmp(name,"Port",strlen("Port")) == 0 )
			param_config.port = (int) n;
		
	}
		
	free(line);
	closefile(f);
	
	return param_config;
}
