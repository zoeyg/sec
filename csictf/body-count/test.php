<?php

$text = "'; ls | base64 && false && echo '";
echo "<h2>The Character Count is: " . exec('printf \'' . $text . '\' | wc -c') . "</h2>";

