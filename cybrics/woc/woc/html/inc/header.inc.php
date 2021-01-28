<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css">
  <link rel="stylesheet" href="theme.css" type="text/css">
  <title>World of Calculators</title>
</head>

<body>
  <div class="text-center py-5" style="	background-image: url(&quot;https://img.vos.uz/5befivyh.jpg&quot;);	background-size: 100vw;	background-position: top center;	background-repeat: no-repeat;">
    <div class="container">
      <div class="row" style="height: 14vw">
<?php
if (@$_SESSION['userid']) {
?>
        <div class="mx-auto align-items-end d-flex"><a class="btn btn-danger text-white" href="?p=logout"><i class="fa fa-sign-out fa-fw fa-1x py-1"></i> Logout <?=htmlspecialchars($_SESSION['username'])?></a></div>
<?php
}
?>
      </div>
