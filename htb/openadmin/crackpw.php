<?php

$publicKey = '00e302ccdcf1c60b8ad50ea50cf72b939705f49f40f0dc658801b4680b7d758eebdc2e9f9ba8ba3ef8a8bb9a796d34ba2e856838ee9bdde852b8ec3b3a0523b1';

$tries = 0;
$fn = fopen($argv[1], "r");
$foundit = false;
while (!feof($fn) && !$foundit) {
    $result = trim(fgets($fn));
    $testKey = hash('sha512', trim($result));
    //echo $testKey . "\n";
    if ($testKey == $publicKey) {
        echo $result;
        $foundit = true;
    }
    $tries = $tries + 1;
    if ($tries % 100000 == 0) {
        echo "Tries " . $tries . ", " . $result . "\n";
    }
}

fclose($fn);

?>