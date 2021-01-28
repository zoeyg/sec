<?php
if (!@$_SESSION['userid'] || !@$_GET['calc']) {
    redir(".");
}

$userid = $_SESSION['userid'];
$calc = $_GET['calc'];

if (!preg_match('#^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$#s', $calc)) {
    redir(".");
}

$error = false;
$sharingLink = "";
if (!is_file("calcs/$userid/$calc.php")) {
    $error = "Sharing failed";
} else {
    $sharingLink = "";
    $sharingLink .= @$_SERVER['HTTPS'] ? "https://" : "http://";
    $sharingLink .= $_SERVER['SERVER_NAME'];
    $sharingLink .= $_SERVER['SERVER_PORT'] == 80 || $_SERVER['SERVER_PORT'] == 443 ? "" : ":" . $_SERVER['SERVER_PORT'];
    $sharingLink .= "/calcs/$userid/$calc.php";
}
?>
      <div class="row">
        <div class="p-5 mx-auto col-10 col-md-10 bg-info">
<?php
if ($error) {
?>
          <div class="alert alert-danger" role="alert">
            <button type="button" class="close" data-dismiss="alert">×</button>
            <h4 class="alert-heading">Error</h4>
            <p class="mb-0"><?=htmlspecialchars($error)?></p>
          </div>
<?php
}
?>
          <h3 class="display-3">Calculator Sharing</h3>
          <div class="px-4 order-1 order-md-2 col-lg-12">
            <h2 class="mb-4">Your Link:</h2>
            <p><input type="text" class="form-control form-control-lg" readonly="readonly" autofocus="autofocus" value="<?=htmlspecialchars($sharingLink)?>" /></p>
            <p><button onclick="location.href = '.';" class="btn btn-lg btn-outline-secondary mx-3 px-3">← Back</button></p>
          </div>
        </div>
      </div>
