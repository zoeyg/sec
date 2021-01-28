<?php
if (@$_SESSION['userid']) {
    redir("?p=inside");
}

$username = trim(@$_POST['username']);
$password = trim(@$_POST['password']);

if (@$_POST['register']) {
    if (strlen($username) < 8 || strlen($password) < 8) {
        redir("?err=minlength");
    }
    
    $userid = substr(md5($username), 0, 16);
    if (is_dir("calcs/$userid")) {
        redir("?err=already");
    }
    
    if (!mkdir("calcs/$userid")) {
        redir("?err=unexpected");
    }
    if (!mkdir("calcs/$userid/templates")) {
        redir("?err=unexpected");
    }
    foreach (glob("default_templates/*.html") as $template) {
        if (!copy($template, "calcs/$userid/templates/" . basename($template))) {
            redir("?err=unexpected");
        }
    }
    if (!file_put_contents("calcs/$userid/.htpwhash", password_hash($password, PASSWORD_BCRYPT, ['cost' => 4]))) {
        redir("?err=unexpected");
    }

    $_SESSION['userid'] = $userid;
    $_SESSION['username'] = $username;
    redir("?p=inside");
} else {
    $userid = substr(md5($username), 0, 16);
    if (!is_dir("calcs/$userid")) {
        redir("?err=wrongpw");
    }
    if (!is_file("calcs/$userid/.htpwhash")) {
        redir("?err=wrongpw");
    }
    if (!password_verify($password, file_get_contents("calcs/$userid/.htpwhash"))) {
        redir("?err=wrongpw");
    }
    
    $_SESSION['userid'] = $userid;
    $_SESSION['username'] = $username;
    redir("?p=inside");
}
