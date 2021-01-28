<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>Appreciation post <3</title>
    <link rel="stylesheet" href="bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif; text-align: center; }
    </style>
</head>
<body>
<div class="page-header">
        <h1>Security Hall of (In)Fame</h1>
</div>
<div class="alert alert-success"><strong>Welcome!</strong> We appreciate every single one of you, but here is a recollection of people we would like to thank for all their help and hard work throughout our time in inforsec.</div>
<p>Pain and I would like to acknowledge the following people for their contributions to our journeys so far inside of infosec, it wouldn't have been the same without you ;)</p>
<h3><strong>1337 hackers (even if you weren't on here, you know who you are).</strong></h3>
<ul class="list-group">
        <li><a href="#" class="list-group-item">NopSled</a></li>
        <li><a href="#" class="list-group-item">snowscan</a></li>
        <li><a href="#" class="list-group-item">Pobre</a></li>
        <li><a href="#" class="list-group-item">mprox</a></li>
        <li><a href="#" class="list-group-item">Dan Card</a></li>
        <li><a href="#" class="list-group-item">imth</a></li>
        <li><a href="#" class="list-group-item">xct</a></li>
        <li><a href="#" class="list-group-item">CyberSecStu</a></li>
        <li><a href="#" class="list-group-item">jkr</a></li>
        <li><a href="#" class="list-group-item">The bunch of Irish lads</a></li>
        <li><a href="#" class="list-group-item">Basically everyone from TMHC</a></li>
</ul>
<h3><strong>And of course the whole HTB Team</strong></h3>
<ul class="list-group">
        <li><a href="#" class="list-group-item">Ch4p</a></li>
        <li><a href="#" class="list-group-item">Arrexel</a></li>
        <li><a href="#" class="list-group-item">g0blin</a></li>
        <li><a href="#" class="list-group-item">makelaris</a></li>
        <li><a href="#" class="list-group-item">egotisticalSW</a></li>
        <li><a href="#" class="list-group-item">Rasta Mouse</a></li>
        <li><a href="#" class="list-group-item">IppSec</a></li>
        <li><a href="#" class="list-group-item">DuckArcher</a></li>
        <li><a href="#" class="list-group-item">azik</a></li>
        <strong>Apologies if we missed anyone, these are the people we managed to find in plain sight.</strong>
</ul>
<hr/>
</body>
</html>