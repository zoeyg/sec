<?php
if (@$_SESSION['userid']) {
    redir("?p=inside");
}

$errors = [
    'wrongpw' => "Bad username or password",
    'minlength' => "Username and password should be min. 8 chars",
    'already' => "This user already exists",
    'unexpected' => "Unexpected error! Contact orgs to fix. cybrics.net/rules#contacts",
];
?>
      <div class="row">
        <div class="p-5 mx-auto col-10 col-md-10 bg-info">
<?php
if (@$errors[$_GET['err']]) {
?>
          <div class="alert alert-danger" role="alert">
            <button type="button" class="close" data-dismiss="alert">×</button>
            <h4 class="alert-heading">Error</h4>
            <p class="mb-0"><?=$errors[$_GET['err']]?></p>
          </div>
<?php
}
?>
          <h3 class="display-3">Enter the world</h3>
          <form method="POST" action="?p=login" id="c_form-h" class="w-50 mx-auto">
            <div class="form-group row"> <label for="inputusernameh" class="col-3 col-form-label">Username<br></label>
              <div class="col-9">
                <input type="text" class="form-control" id="inputusernameh" placeholder="min. 8 chars" required="required" autofocus="autofocus" name="username"> </div>
            </div>
            <div class="form-group row"> <label for="inputpasswordh" class="col-3 col-form-label">Password</label>
              <div class="col-9">
                <input type="password" class="form-control" id="inputpasswordh" placeholder="min. 8 chars" required="required" name="password"> </div>
            </div>
            <input type="submit" name="register" value="Register" class="btn btn-primary px-3 mx-3 btn-lg"><button type="submit" name="login" class="btn btn-outline-primary px-3 mx-3 btn-lg"><i class="fa fa-sign-in fa-fw fa-1x py-1" style="margin-left: -0.5em"></i> Login</button>
          </form>
        </div>
      </div>
