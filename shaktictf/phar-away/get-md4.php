<?php

$success = false;

while(!$success) {
    $potentialHash = rand(0,9);
    for($i = 0; $i <=28; $i++) {
        $potentialHash .= strval(rand(0,9));
    }
    $potentialHash = '0e' . $potentialHash;
    if ($potentialHash == hash("md4", $potentialHash))
    {
        echo $potentialHash;
        $success = true;
    }
}