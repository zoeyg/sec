<?php

$hash = 'e626d51f8fbfd1124fdea88396c35d05';

$tries = 0;
$fn = fopen($argv[1], "r");
echo $argv[1];
$foundit = false;
while (!feof($fn) && !$foundit) {
    $result = trim(fgets($fn));
    $testKey = md5(crypt($result,'fa'));
    // echo $testKey . "\n";
    if ($testKey == $hash) {
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