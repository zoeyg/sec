#include "log.h"

void log_init(const char *name)
{
	openlog(name, LOG_PERROR|LOG_PID|LOG_CONS, LOG_USER);
}

void log_info(const char *format, ...)
{
	va_list args;
	va_start(args, format);
	
	vsyslog(LOG_INFO, format, args);

	va_end(args);
}

void log_warning(const char *format, ...)
{
	va_list args;
	va_start(args, format);
	
	vsyslog(LOG_WARNING, format, args);

	va_end(args);
}

void log_error(const char *format, ...)
{
	va_list args;
	va_start(args, format);
	
	vsyslog(LOG_ERR, format, args);

	va_end(args);
}

void system_log(int priority, const char *format, ...)
{
	va_list args;
	va_start(args, format);
	
	vsyslog(priority, format, args);

	va_end(args);
}