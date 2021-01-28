# Enumeration

Trying to login with admin generates a mongodb error. Perhaps noSQL injection?

After a long time with no luck, we run gobuster and find `/create`. This page makes a call to `/api/check_title`.
