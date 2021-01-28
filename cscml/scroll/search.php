<?php

header("Location: index.php");

if (isset($_GET["img"]) && !empty($_GET["img"])) {

    $img = $_GET["img"];
    require($img);
}

header("Location: index.php");

?>
</br>
WIP! DO NOT PUSH TO PROD YET -_-

