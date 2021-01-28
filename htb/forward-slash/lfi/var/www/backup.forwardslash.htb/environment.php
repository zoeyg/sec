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
    <title>Quick lesson</title>
    <link rel="stylesheet" href="bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif; text-align: center; }
    </style>
</head>
<body>
<center>
<h1>Just a quick lesson to educate all you 1337 hackers...</h1><br>
<h2>Cigarettes contaminate more than plastic bags AND plastic bottles.</h2><br>
<h2>For every cigarette bud thrown in water, 50 litres OF the water is contaminated.</h2><br>
<h2>Around the world, 6 billion cigarettes are consumed daily.<br>64% of those cigarettes end up in the oceans, beaches, rivers and forests.</h2>
<br><h2>Join the movement, we have currently saved <?php echo(mt_rand(1337, 99999))?> cat-girls.</h2>
<h2>Thank you for your time,<br>-Chiv</h2>
<!--Although this box is made purely for fun, all facts included are completely true (obviously not the random number at the end), please take care of our planet, we only have one.-->
</center>
</body>
</html>