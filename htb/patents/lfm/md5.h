#ifndef MD5_INCLUDE
#define MD5_INCLUDE

#include <openssl/md5.h>
#include <stdio.h>
#include <errno.h>


#include "file.h"
#include "log.h"

//void (*fileManager_error)(int id, const char *error_msg, int err);

char *md5sum(char *fname);

#endif
