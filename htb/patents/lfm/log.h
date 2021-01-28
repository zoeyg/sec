#include <syslog.h>
#include <string.h>
#include <stdarg.h>

// initialize syslog
void log_init(const char *name);

void log_info(const char *format, ...);
void log_warning(const char *format, ...);
void log_error(const char *format, ...);

void system_log(int priority, const char *format, ...);
