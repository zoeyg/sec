<?php

use Lisachenko\Protocol\FCGI;
use Lisachenko\Protocol\FCGI\FrameParser;
use Lisachenko\Protocol\FCGI\Record;
use Lisachenko\Protocol\FCGI\Record\BeginRequest;
use Lisachenko\Protocol\FCGI\Record\Params;
use Lisachenko\Protocol\FCGI\Record\Stdin;

include "vendor/autoload.php";

$phpSocket = fsockopen('127.0.0.1', 9000, $errorNumber, $errorString);
$packet    = '';

$packet .= new BeginRequest(FCGI::RESPONDER);
$packet .= new Params(['SCRIPT_FILENAME' => '/var/www/html/index.php']);
$packet .= new Params();
$packet .= new Stdin();

fwrite($phpSocket, $packet);

$response = '';
while ($partialData = fread($phpSocket, 4096)) {
    echo 'partialData: ' . $partialData . "\n";
    $response .= $partialData;
    while (FrameParser::hasFrame($response)) {
        $record = FrameParser::parseFrame($response);
        var_dump($record);
        echo "\n\n" . $record->contentData . "\n\n";
    };
};

echo $response;

fclose($phpSocket);