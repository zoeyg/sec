#ifndef PARAMS_PARSING_INCLUDE
#define	PARAMS_PARSING_INCLUDE

#include <stdio.h>
#include <string.h>
#include <errno.h>

#include "file.h"
#include "arg_parsing.h"

// struct for configuration parameters
struct params_configuration
{
	int nums_of_children;					
	int nums_of_threadsPerProcess;
	int max_nums_of_threadsPerProcess;
	float percentage_of_deadChildren;
	int port;
	char *log_file;
	char *config_file;
	char *authorized_user;
	char *authorized_pass;		
} param_config; 

// parse the configuration file
struct params_configuration parse_config_file(char *filename);

#endif
