<?php

$sort_by='"]);}phpinfo();/*';
$sorter = 'var_dump';
$sort_function = '
            return ' . ($sort_order == 'ASC' ? 1 : -1) . ' * ' . $sorter . '($a["' . $sort_by . 
'"], $b["' . $sort_by . '"]);
        ';

echo $sort_function;

echo file_get_contents('AAAAA'));