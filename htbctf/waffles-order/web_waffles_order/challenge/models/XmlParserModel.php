<?php
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
        if (preg_match_all("/<!ENTITY\s+[^\s]+\s+SYSTEM\s+[\'\"](?i:file|http|https|ftp|php|zlib|data|glob|expect|zip):\/\//mi", $this->data))
        {
            die('Unsafe XML');
        }
        $env = simplexml_load_string($this->data, 'SimpleXMLElement', LIBXML_NOENT);
        foreach ($env as $key => $value)
        {
            $_ENV[$key] = (string)$value;
        }
    }

}