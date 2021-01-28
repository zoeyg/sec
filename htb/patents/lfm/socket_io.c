#include "socket_io.h"

int write_message(int connsd, char *msg, size_t nleft)
{
	size_t nwritten = 0;
	ssize_t n;
	
	while (nleft > 0) {
		n = write(connsd, msg+nwritten, nleft);
		if (n == -1) {
			if (errno == EINTR) // interrupted by a signal, don't exit
				continue;
			else
				return -1;
		}
		if (n == 0) {			// EOF
			if (nleft > 0) {
				//fatal_error(connsd, "ERROR: client closed connection before finishing to write the message of bad request");
				return -1;
			}
			else
				break;
		}
		nleft -= n;
		nwritten += n;
	}
	
	return 0;
}

char *read_line(int connsd, void (*error)(int id, const char *error_msg, int err))
{
	size_t size = MIN_LINE_SIZE;
	size_t b_read = 0;										
	ssize_t n;

	char *line = (char *)malloc(size*sizeof(char));
	
	if(line==NULL)
		(*error)(connsd,"ERROR allocating line for message reading", errno);
	
	while(1){
		// timeout
		n=read(connsd,line+b_read,1);
		if (n < 0){
			if(errno == EINTR)			// interrupted by a signal. don't exit.
				continue;
			else {
				free(line);
				return NULL;
			}
		}
		if (n == 0)						// EOF
			break;

		if (line[b_read] == '\n')
			break; 

		b_read++;
		
 		if(b_read >= size-1){				//-1 needed for '\0'
 			size <<= 1;						//double size of line;
 			line = (char *)realloc(line,size*sizeof(char));
 			if (line == NULL)
 				(*error)(connsd,"ERROR allocating line for message reading", errno);
		}
	}	
	
	line[b_read+1] = '\0';
	// printf("line: %s \n%u\n\n", line, strlen(line));
	return line;
}
