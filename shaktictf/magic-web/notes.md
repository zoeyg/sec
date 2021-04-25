<?php
ini_set('display_errors', 'on');
ini_set('error_reporting', E_ALL);

$success = '
<div class="alert alert-success alert-dismissible" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    Function declared.
</div>
';

include "flag.php";

if (isset ($_POST['c']) && !empty ($_POST['c'])) {
    $blacklist = "/mv|rm|exec/i";
    $code = $_POST['c'];
    if(strlen($code)>60) {
        die("too long to execute");
    }
    if(preg_match($blacklist,$code)){
        die("that's blocked");
    }
    $fun = create_function('$flag', $code);
    print($success);

}
?>