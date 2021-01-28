<?php
if (!@$_SESSION['userid'] || !@$_GET['template']) {
    redir(".");
}

$userid = $_SESSION['userid'];
$template = $_GET['template'];

if (!preg_match('#^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$#s', $template)) {
    redir(".");
}
if (!is_file("calcs/$userid/templates/$template.html")) {
    redir(".");
}

if (trim(@$_POST['field'])) {
    $field = trim($_POST['field']);
    
    if (!preg_match('#(?=^([ %()*+\-./]+|\d+|M_PI|M_E|log|rand|sqrt|a?(sin|cos|tan)h?)+$)^([^()]*|([^()]*\((?>[^()]+|(?4))*\)[^()]*)*)$#s', $field)) {
        $value = "BAD";
    } else {
        if (@$_POST['share']) {
            $calc = uuid();
            file_put_contents("calcs/$userid/$calc.php", "<script>var preloadValue = <?=json_encode((string)($field))?>;</script>\n" . file_get_contents("inc/calclib.html") . file_get_contents("calcs/$userid/templates/$template.html"));
            redir("?p=sharelink&calc=$calc");
        } else {
            try {
                $value = eval("return $field;");
            } catch (Throwable $e) {
                $value = null;
            }
            
            if (!is_numeric($value) && !is_string($value)) {
                $value = "ERROR";
            } else {
                $value = (string)$value;
            }
        }
    }
    
    echo "<script>var preloadValue = " . json_encode($value) . ";</script>";
}

require "inc/calclib.html";
require "calcs/$userid/templates/$template.html";
