#include "file.h"


FILE *openfile(char *filename,char *mode)
{
	FILE *f;
	size_t size = 64;
	char s[size];
	
	if((f=fopen(filename,mode))==NULL){
		snprintf(s, size, "Error opening file %s", filename);
		system_log(LOG_ERR, "ERROR in fopen(%s) (%s)\n", s, strerror(errno));
		exit(EXIT_FAILURE);
	}
	return f;
}

int openfile_low(char *filename,int flags,mode_t mode)
{
	int fd;
	
	if ((fd=open(filename,flags,mode))==-1) {
		fprintf(stderr, "ERROR in open() (%s)\n", strerror(errno));
		exit(EXIT_FAILURE);
	}

	return fd;
}

void redirect(int from,int to)
{
	int fd;
	
	fd=dup2(to,from);
	
	while (fd == -1){
		if(errno != EINTR){
			fprintf(stderr, "ERROR in dup2() (%s)\n", strerror(errno));
			exit(EXIT_FAILURE);
		}
		fd=dup2(to,from);
	}
}

void closefile(FILE *f)
{
	char error[256];

	if(fclose(f)==-1){
		fprintf(stdout,"ERROR closing file. errno = %d \n", errno); 
		strerror_r(errno, error, sizeof(error));
		system_log(LOG_WARNING, "ERROR closing file (%s)\n", error);
	}
}


void fatal_error(int id,const char *error_msg, int err)
{
	char error[256];
	// strerror_r is thread-safe
	strerror_r(err, error, sizeof(error));

	system_log(LOG_ERR, "%s (%s)\n", error_msg, error);
	
	closefile_low(logfile);
	closefile_low(id);
	closelog();

	exit(EXIT_FAILURE);
}

void closefile_low(int fd)
{
	// use thread-safe strerror_r()
	char error[256];

	if(close(fd)==-1){
		fprintf(stdout,"ERROR closing file\n");
		strerror_r(errno, error, sizeof(error)); 
		system_log(LOG_WARNING, "ERROR closing file (%s)\n", error);
	}
}
