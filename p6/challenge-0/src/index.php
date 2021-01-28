<?php

# print errors
error_reporting(E_ALL);
ini_set('display_errors', 'On');

# flag is in /flag/???
highlight_file(__FILE__);

if (isset($_GET['p'])) { foreach ($_GET['p'] as $p) { putenv($p); } }

?>
<pre><?system('env')?>
<?php

if (file_exists($_GET['file'])) {
    var_dump(escapeshellarg($_GET['file']) . " 2>&1");
    echo system(escapeshellarg($_GET['file']) . " 2>&1");
}