CC = gcc

INSTALL=/opt
USER=$(shell echo $$USER)

THIS=$(shell pwd)
program_NAME := lfmserver
program_C_SRCS := $(wildcard *.c)
program_C_OBJS := ${program_C_SRCS:.c=.o}
program_OBJS := $(program_C_OBJS)

CFLAGS += -Wall -Wextra -zno-exec-stack -fno-stack-protector -no-pie
#LDFLAGS += -L/usr/local/lib -Wl,-rpath=/usr/local/lib

LDFLAGS += -Wall -Wextra -pthread -lm -lssl -lcrypto -fno-stack-protector -no-pie 


#######################################################################
################## VALGRIND ###########################################
# valgrind --tool=memcheck --leak-check=yes --track-origins=yes ./lfmserver 2> valgrind
# valgrind --tool=memcheck --leak-check=full --show-leak-kinds=all --track-origins=yes ./lfmserver 2> valgrind
# Remember to remove the "-O2" flag for gcc since it can cause errors on valgrind
#######################################################################

# Add these lines for debugging
# flag -g tells gcc to add debugging symbols to assembly code
CFLAGS += -g
LDFLAGS += -g

.PHONY: all clean distclean

all: $(program_NAME)

$(program_NAME): $(program_OBJS)
	$(CC) $(program_OBJS) -o $(program_NAME) $(LDFLAGS)
	
clean:
	@- $(RM) $(program_NAME)
	@- $(RM) $(program_OBJS)
	@- $(RM) *~

distclean: clean

install: 
	mkdir -p $(INSTALL)/$(program_NAME)
	cp ./$(program_NAME) $(INSTALL)/$(program_NAME)
	mkdir -p /etc/$(program_NAME)
	cp ./$(program_NAME).conf /etc/$(program_NAME)/$(program_NAME).conf
	echo "cd $(INSTALL)/$(program_NAME) && ./$(program_NAME)" > /usr/bin/$(program_NAME)
	chmod +x /usr/bin/$(program_NAME)
	mkdir -p $(INSTALL)/$(program_NAME)/files
	cp ./Makefile $(INSTALL)/$(program_NAME)/Makefile

uninstall:
	rm -r /etc/$(program_NAME)
	rm -r $(INSTALL)/$(program_NAME)
	rm -r /usr/bin/$(program_NAME)

# To use this below, you should include a header file for you main .c file
define OBJECT_DEPENDS_ON_CORRESPONDING_HEADER
    $(1) : ${1:.o=.h}
endef

$(foreach object_file,$(program_OBJS),$(eval $(call OBJECT_DEPENDS_ON_CORRESPONDING_HEADER,$(object_file))))
