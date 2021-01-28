<?php

session_start();

if (isset($_POST['url'])) {

	if((!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) && $_SERVER['REMOTE_ADDR'] !== "127.0.0.1"){
		echo "User must be logged in to use API";
		exit;
	}

	$picture = explode("-----output-----<br>", file_get_contents($_POST['url']));
	if (strpos($picture[0], "session_start();") !== false) {
		echo "Permission Denied; not that way ;)";
		exit;
	}
	echo $picture[0];
	exit;
}
?>
<!-- TODO: removed all the code to actually change the picture after backslash gang attacked us, simply echos as debug now -->
