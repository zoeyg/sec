<?php

const PASSWORD_HASH_SALT = 'NeverChangeIt:)';
$publicKey = 'd1d58b2f732fd546d9507da275a71bddc0c2300a214af3f3f3a5f5f249fe275e';

function doHash($string) {
	return hash('sha256', $string);
}

function getPasswordHash($password) {
    return doHash($password . PASSWORD_HASH_SALT);
}

function getPublicKey($passwordHash) {
    return doHash('10.255.0.2' . $passwordHash);
}

$tries = 0;
$fn = fopen($argv[1], "r");
while (!feof($fn)) {
    $result = fgets($fn);
    $testKey = getPublicKey(getPasswordHash(trim($result)));
    //echo $testKey . "\n";
    if ($testKey == $publicKey) {
        echo $result;
    }
    $tries = $tries + 1;
    if ($tries % 100000 == 0) {
        echo "Tries " . $tries . "\n";
    }
}

fclose($fn);

?>