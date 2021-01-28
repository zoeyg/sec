<?php
include("db.php");
if(isset($_POST["email"]) && isset($_POST["password"]))
{
        $email=$_POST["email"];
        $password = $_POST["password"];
        $password = md5(crypt($password,'fa'));
        $stmt=$conn->prepare("select email,password from users where email=? and password=?");
        $stmt->bind_param("ss",$email,$password);
        $stmt->execute();
        $result = $stmt->get_result();
        $num_rows = $result->num_rows;
        if($num_rows > 0 && $email === "srvadm@quick.htb")
        {
                session_start();
                $_SESSION["loggedin"]=$email;
                header("location: home.php");
        }
        else
        {
                echo '<script>alert("Invalid Credentials");window.location.href="/index.php";</script>';
        }
}
else
{?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Quick | Printers </title>
<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined'>
<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'>
<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Montserrat:600|Roboto:400,500,600,700|Poppins:400,600&amp;display=swap'>
<style>
html,
body {
  padding-top: 0px !important;
  height: 100vh;
}

body {
  font-family: "Roboto", sans-serif;
  color: #000000;
}

h1 {
  font-family: "Roboto", sans-serif;
}

.card {
  border-radius: 8px !important;
}

.card .card-header {
  background-color: #ffffff;
}

.card .card-header.card-header:first-child {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card-outline {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: 1px solid #dadce0;
}
</style>
<script>
  window.console = window.console || function(t) {};
</script>
<script>
  if (document.location.search.match(/type=embed/gi)) {
    window.parent.postMessage("resize", "*");
  }
</script>
</head>
<body translate="no">
<body>

<div class="container h-100 mt-4">
<div class="row justify-content-center align-items-center h-100">
<div class="col-12 col-sm-12 col-md-8 col-lg-5 mx-auto">
<div class="card card-outline">
<div class="card-header text-center text-primary">
<h3>
Sign In
</h3>
</div>
<div class="card-body">
<form action="" method="POST">
<div class="form-group">
<label for="exampleInputEmail1">Email address</label>
<input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
</div>
<div class="form-group">
<label for="exampleInputPassword1">Password</label>
<input type="password" name="password" class="form-control" id="exampleInputPassword1">
</div>
<div class="form-group form-check">
<input type="checkbox" class="form-check-input" id="exampleCheck1">
<label class="form-check-label" for="exampleCheck1">Check me out</label>
</div>
<button type="submit" class="btn btn-primary btn-block rounded-pill mt-3 font-weight-bold">LOGIN</button>
</form>
</div>
</div>
</div>
</div>
</div>

</body>
<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'></script>
<script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'></script>
</body>
</html>
<?php } ?>
