#include "md5.h"

char *md5sum(char *filename)
{
    unsigned char c[MD5_DIGEST_LENGTH];
    int i;
    
    MD5_CTX mdContext;
    int bytes;

    unsigned char data[1024];

    char *md5sum = malloc((MD5_DIGEST_LENGTH*2 + 1) * sizeof(char));
    
    if (md5sum == NULL) {
        //(*fileManager_error)(id, "ERROR: can't allocate string for md5sum (md5)", errno);
        log_error("Can't allocate memory of size %d (md5)\n", (MD5_DIGEST_LENGTH*2 + 1));
        return NULL;
    }

    FILE *inFile = fopen (filename, "rb");
    if (inFile == NULL) {
        //(*fileManager_error)(id, "ERROR: can't open file (md5)", errno);
         log_error("Can't open file %s (md5)\n", filename);
         return NULL;
    }

    MD5_Init (&mdContext);
    while ((bytes = fread (data, 1, 1024, inFile)) != 0)
        MD5_Update (&mdContext, data, bytes);
    MD5_Final (c,&mdContext);

    for(i = 0; i < MD5_DIGEST_LENGTH; i++) sprintf(md5sum + 2*i, "%02x", c[i]);
    md5sum[MD5_DIGEST_LENGTH*2] = '\0';

    //fprintf(stdout, "\n%s\n", md5sum);

    fclose (inFile);
    return md5sum;
}
