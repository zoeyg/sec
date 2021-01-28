<?php

$m = new Memcached();
$m->setOption(Memcached::OPT_BINARY_PROTOCOL, true);
$m->setSaslAuthData("felamos", "zxcvbnm");
$m->addServer('10.10.10.190', 11211);
$m->add('test', 'testagain');
$keys=$m->getAllKeys();
echo gettype($keys);
echo count($keys);