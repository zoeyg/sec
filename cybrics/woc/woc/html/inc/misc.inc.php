<?php
ob_start();
session_start();

function redir($url) {
    header("Location: $url", true, 303);
    ob_end_clean();
    exit;
}

function uuid() {
    return sprintf("%s-%s-4%.3s-%s-%s", bin2hex(random_bytes(4)), bin2hex(random_bytes(2)), bin2hex(random_bytes(2)), bin2hex(random_bytes(2)), bin2hex(random_bytes(6)));
}
