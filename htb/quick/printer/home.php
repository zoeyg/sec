<?php
include("db.php");
session_start();
if($_SESSION["loggedin"])
{
if ($_SERVER["REQUEST_METHOD"] == "POST") {
}
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>PHP POS Print Server</title>
    <link rel="stylesheet" href="css/bulma.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="wrapper">
        <section class="hero is-info">
            <div class="hero-head">
                <header class="nav">
                    <div class="container">
                        <div class="nav-left">
                            <a href="home.php" class="nav-item is-active">
                                Quick |  POS Print Server
                            </a>
                        </div>
                        <div class="nav-right">
                            <?php if (file_exists('./logs.php')) { ?>
                            <a href="logs.php" class="nav-item">
                                Logs
                            </a>
                            <?php } ?>
                            <a href="printers.php" class="nav-item">
                                Printers
                            </a>
                            <a href="add_printer.php" class="nav-item">
                                Add Printer
                            </a>
                        </div>
                    </div>
                </header>
            </div>
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h2 class="subtitle">
                        An application for printing POS receipts.
                    </h2>
                </div>
            </div>
        </section>

        <div class="hero is-light has-text-centered">
        </div>

        <section class="section">
            <div class="container"><center>
		<img src="images/printer2.png" height="800" width="800"/>
            </div>
        </section>
    </div>

    <footer class="footer">
        <div class="container">
            <p>
                <span class="icon is-pulled-right">
                </span>
                &copy; <?= date('Y'); ?> @ quick.htb
            </p>
        </div>
    </footer>

    <script type="text/javascript" src="js/script.js"></script>
</body>
</html>
<?php
}
else
{
        echo '<script>alert("Invalid Username/Password");window.location.href="/index.php";</script>';
}
?>

