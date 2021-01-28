#include "lfm.h"


void lfm_init(void (*error_fcn)(int id, const char *error_msg, int err))
{
	fileManager_error = error_fcn;
}

void url_decode(char* src, char* dest, int max) {
    // TODO: implement
}

void send_bad_request(int connsd)
{
	if (write_message(connsd, bad_request, strlen(bad_request)) == -1) {
		log_info("Client closed connection");
	}
}

void send_401(int connsd)
{
	if (write_message(connsd, unauthorized, strlen(unauthorized)) == -1) {
		log_info("Client closed connection");
	}
}

void send_404(int connsd)
{
	if (write_message(connsd, file_not_found, strlen(file_not_found)) == -1) {
		log_info("Client closed connection");
	}
}

void send_500(int connsd)
{
	if (write_message(connsd, internal_error, strlen(internal_error)) == -1) {
		log_info("Client closed connection");
	}
}

void send_406(int connsd, char *md5)
{
	char *m = alloca(strlen(md5_not_match) + strlen(md5) + 1);
	sprintf(m, md5_not_match, md5);

	if (write_message(connsd, m, strlen(m)) == -1) {
		log_info("Client closed connection");
	}
}

void free_struct(struct msg *p) 
{
	free(p);
}

void free_message(struct msg *p)
{
	size_t i = 0;
	size_t len = 0;
	len = p->nlines;
	// len = sizeof(p->message);

	for (i=0;i<len;i++) 
		free(p->message[i]);
	
	free(p->message);
}

void free_object(struct msg *p)
{
	if (p->object != NULL)
		free(p->object);
	if (p->o_noext != NULL) 
		free(p->o_noext);
}

char *parse_object(struct msg *message)
{
	char *file = NULL;
	size_t len = strlen(message->object);

	if (strncmp(message->object, "/", len) == 0) {
		message->object = file;
	} else if (strstr(message->object, "..") != NULL) {
		message->object = file;
	} else {
		file = malloc((strlen(root)+len+1)*sizeof(char));
		if (file == NULL)
			(*fileManager_error)(message->connsd, "ERROR in malloc [parse_object]", errno);
		
		// save object without path
		message->o_nodir = message->object;
		
		snprintf(file, strlen(root)+len+1,"%s%s", root, message->object);
		message->object = file;
	}

	return file;
}

int parse_method(int connsd, char *line, struct msg *msg)
{
	char *method = NULL;
	char *object = NULL;
	char *version=NULL;
	char *saveptr;					//argument for function strtok_r() [thread SAFE]
	
	//printf("%s\n",line);
	method=strtok_r(line," ", &saveptr);

	if (method==NULL) {
		send_bad_request(connsd);
		return -1;
	}

	if (strcmp(method, "CHECK") == 0) {
		msg->method = CHECK;
	} 
	else if (strcmp(method, "GET") == 0) {
		msg->method = GET;
	}
	else if (strcmp(method, "PUT") == 0) {
		msg->method = PUT;
	}
	else {
		send_bad_request(connsd);
		return -1;
	}

	object = strtok_r(NULL, " ", &saveptr);

	if (object==NULL) {
		send_bad_request(connsd);
		return -1;
	}

	msg->object = object;

	version=strtok_r(NULL,"\r\n", &saveptr);	

	if (version==NULL) {
		send_bad_request(connsd);
		return -1;
	}
	
	if (strcasecmp(version, "LFM") != 0) {
		send_bad_request(connsd);
		return -1;
	} 

	// first line header is OK
	// convert the object requested adding root path of the server
	parse_object(msg);

	return 0;
}

int parse_line(int connsd, char *line, struct msg *msg)
{
	char *saveptr;					//argument for function strtok_r() [thread SAFE]
	char *name;
	char *value;
	
	name = strtok_r(line,"=", &saveptr);
	if (name==NULL) {
		send_bad_request(connsd);
		return -1;
	}
	
	value = strtok_r(NULL,"\r\n", &saveptr);
		
	if (value==NULL) {
		send_bad_request(connsd);
		return -1;
	}

	if (strcasecmp(name, "User") == 0) {
		msg->user = value;
	} 
	else if (strcasecmp(name, "Password") == 0) {
		msg->pass = value;
	} 
	
	return 0;

}

struct msg *read_message(int connsd)
{
	size_t size = MIN_LINE_NUMBER;
	size_t i = 0;					// line index
	char *line = NULL;				// current read line

	struct msg *p = (struct msg *) malloc(sizeof(struct msg));
		
	if (p==NULL){
		(*fileManager_error)(connsd,"ERROR allocating structure for message reading", errno);
	}			

	p->object = NULL;
	p->o_noext = NULL;
	p->connsd = connsd;
	
	p->message = (char **) malloc (size*sizeof(char *));
	if (p->message == NULL) {
		(*fileManager_error)(connsd, "ERROR allocating array of lines(=message) for message reading", errno);
	}
	
	p->nlines = 0;

	for(;;){
		line = NULL;

		line = read_line(connsd, fileManager_error);
		
		if (line == NULL) {
			free_object(p);
			free_message(p);
			free_struct(p);
			return NULL;
		}
		p->nlines += 1;
		p->message[i] = line;
			
		if (strncmp(p->message[i],"\r\n",2) == 0) 
			break;
		
		if (i==0) {
			if (parse_method(connsd,p->message[i], p) == -1) {
				free_message(p);
				free_struct(p);
				return NULL;
			}
		} else {
			if (parse_line(connsd,p->message[i], p) == -1) {
				free_object(p);
				free_message(p);
				free_struct(p);
				return NULL;
			}
		}
	
		if (i == size-1){
			size <<= 1;	//double number of lines;
 			p->message = (char **)realloc(p->message,size*sizeof(char *));
 			if (p->message == NULL)
 				(*fileManager_error)(connsd,"ERROR allocating array of lines for message reading", errno);
 			//p->nlines = size;
		}
		i++;
	}
	
	// BODY PART
	if (p->method != GET) {
		line = NULL;
		line = read_line(connsd, fileManager_error);
		
		if (line == NULL) {
			free_object(p);
			free_message(p);
			free_struct(p);
			return NULL;
		}
		if (line[strlen(line)-1] == '\n') {
			line[strlen(line)-1] = '\0';
		}
		p->body = line;
	}
	return p;

}

int send_header(char *first_line, struct msg *message)
{
	int	file_size;
	int	char_for_size;									//number of chars for file_size (eg. 128 --> 3)
	char *size;
	int header_length;
	char *header;

	struct stat sf;

	if (message->method != GET) {
		long unsigned int len = strlen(message->body != NULL ? message->body : "");
		char_for_size = (unsigned int)((ceil(log10(len))+1)*sizeof(char));
		size = alloca(6+char_for_size+1);
		sprintf(size,"Size: %lu\r\n",len);
	} else {
		if (stat(message->object,&sf) == -1) {
			log_error("ERROR in stat() for %s\n", message->object);
			return -1;
		}			
		
		file_size = sf.st_size;

		char_for_size = (unsigned int)((ceil(log10(file_size))+1)*sizeof(char));		//number of chars for file_size (eg. 128 --> 3)
		size = alloca(6+char_for_size+1);
		sprintf(size,"Size: %u\r\n",file_size);
	}
					
	header_length = strlen(first_line)+strlen(size)+2;
	header = alloca(header_length);
	sprintf(header,"%s%s\r\n",first_line,size);
	
	if (write_message(message->connsd, header, header_length) == -1) {
		log_info("couldn't send header [send_header]");
		return -1;
	}
	
	return (int) (message->method != GET ? 1 : sf.st_size);
}

int handle_check(struct msg *message)
{
    // TODO: implement

	send_401(message->connsd);
	return -1;
}

int handle_get(struct msg *message)
{	
    // TODO: implement
    //
	send_bad_request(message->connsd);
    return 0;
}



int handle_put(struct msg *message, struct params_configuration *param, size_t max_size)
{
    char *ok_header = "LFM 200 OK\r\n";
    //char fileToPut[MAX_FILENAME_SIZE];

    // handle authentication (TODO REFACTOR)
    if (message->user != NULL && message->pass != NULL){
		if (strcmp(message->user, param->authorized_user) == 0 &&
			strcmp(message->pass, param->authorized_pass) == 0) {


	        if (send_header(ok_header, message) == -1) {
		        return -1;
	        }

            // TODO: implement

            max_size = max_size; // AVOID WARNING 
            return 0;
        }
    }

	send_401(message->connsd);
	return -1;
}

int handle_lfm_connection(int connsd, char *ip)
{
	struct msg *message;

	char *client_ip = strndup(ip, INET_ADDRSTRLEN+1);
	free(ip);

	if ((message=read_message(connsd)) == NULL) {
		return -1;
	}
	message->client_ip = client_ip;

	if (message->method == CHECK) {
		handle_check(message);
	} else if (message->method == GET) {
		handle_get(message);
	} else if (message->method == PUT) {
		handle_put(message, &param_config, MAX_OBJECT_SIZE);
	}

	free_object(message);
	free_message(message);
	free_struct(message);

	return 1;
}
