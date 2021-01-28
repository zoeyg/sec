#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
	long vuln = 0;
        char buf[16];

	gets(buf);

	if (vuln == 0xd3adb33f){
		system("/bin/sh");
	}
}
