<?php

$data='{"ID":"' . $argv[1] .'"}';
echo base64_encode($data)."\n";