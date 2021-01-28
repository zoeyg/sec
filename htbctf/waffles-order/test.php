<?php

function safe_object($serialized_data)
{
    $matches = [];
    $num_matches = preg_match_all('/(^|;)O:\d+:"([^"]+)"/', $serialized_data, $matches);

    var_dump($matches);

    for ($i = 0; $i < $num_matches; $i++) {
        $methods = get_class_methods($matches[2][$i]);
        foreach ($methods as $method) {
            if (preg_match('/^__.*$/', $method) != 0) {
                die("Unsafe method: ${method}");
            }
        }
    }
}

class XmlParserModel
{
    private string $data;
    private array $env;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function __wakeup()
    {
        echo 'WAKEUP!';
        if (preg_match_all("/<!ENTITY\s+[^\s]+\s+SYSTEM\s+[\'\"](?i:file|http|https|ftp|php|zlib|data|glob|expect|zip):\/\//mi", $this->data))
        {
            die('Unsafe XML');
        }
        //$env = simplexml_load_string($this->data, 'SimpleXMLElement', LIBXML_NOENT);
        //foreach ($env as $key => $value)
        //{
        //   $_ENV[$key] = (string)$value;
        //}
    }

}

class UserModel
{
    public string $username;
}

$xml = <<<XML
<?xml version='1.0'?><document><title>Forty What?</title><from>Joe</from><to>Jane</to><body>I know that's the answer -- but what's the question?</body></document>
XML;

$test = new XmlParserModel('<document />');

$s = serialize($test);

echo urlencode($s)."\n";

//$s = 'O:14:"XmlParserModel":1:{s:20:"XmlParserModeldata";s:12:"<document />";}';
//safe_object($s);

//unserialize($s);

$t = 'O:14:"XmlParserModel":1:{s:20:"%00XmlParserModel%00data";s:12:"<document />";}';
//$t = 'O%3A14%3A%22XmlParserModel%22%3A1%3A%7Bs%3A20%3A%22%00XmlParserModel%00data%22%3Bs%3A12%3A%22%3Cdocument+%2F%3E%22%3B%7D';

safe_object($t);

unserialize(urldecode($t));