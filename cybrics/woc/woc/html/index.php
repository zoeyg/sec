<?php
require "inc/misc.inc.php";

$pages = [
    "" => "main.php",
    "login" => "login.php", 
    "logout" => "logout.php",
    "inside" => "inside.php",
    "newtemplate" => "newtemplate.php",
    "calc" => "calc.php",
    "sharelink" => "sharelink.php",
];

$page = @$_GET['p'];
$page = @$pages[$page] ?: "main.php";

if ($page != "calc.php") {
    require "inc/header.inc.php";
    require "inc/$page";
    require "inc/footer.inc.php";
} else {
    require "inc/$page";
}
