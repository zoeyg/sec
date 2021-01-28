#include <stdio.h>
#include <stdlib.h>

//gcc -m64 -o chapter_3 chapter_3.c -no-pie -fno-stack-protector -z execstack -masm=intel
// help function to make this task easier, ignore it
void help() {
    asm("jmp rsp");
}

int main(int argc, char **argv) {
    char buffer[16];                   // 16 byte buffer
    fgets(buffer, 200, stdin);         // bug, we'll read 200 bytes into a 16 byte buffer
    return 0;                          // triggers return / return address is overflowed
}