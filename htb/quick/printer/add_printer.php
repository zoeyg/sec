<?php
include("db.php");
$error = $message = $title = $type = $profile = $char_per_line = $path = $ip_address = $port = '';
include("db.php");
session_start();
if($_SESSION["loggedin"])
{

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (empty($_POST["title"])) { $error .= '<p><strong>Title</strong> is required</p>'; }
    if (empty($_POST["type"])) { $error .= '<p><strong>Type</strong> is required</p>'; }
    if (empty($_POST["profile"])) { $error .= '<p><strong>Profile</strong> is required</p>'; }

    if ($_POST["type"] == 'network') {
        if (empty($_POST["ip_address"])) { $error .= '<p><strong>IP Address</strong> is required</p>'; }
        if (empty($_POST["port"])) { $error .= '<p><strong>Port</strong> is required</p>'; }
    }

    if(!$error){
    $title = $_POST["title"];
    $ip_address = $_POST["ip_address"];
    $port = $_POST["port"];
    $stmt=$conn->prepare("insert into jobs values(?,?,?)");
    $stmt->bind_param("sss",$title,$ip_address,$port);
    $stmt->execute();
    $message = 'Printer added';}
}

?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Quick | POS Print Server</title>
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
                            <a href="home.php" class="nav-item">
                                Quick | POS Print Server
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
                            <a href="add_printer.php" class="nav-item is-active">
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
            <div class="hero-body heading">
                <h1 class="title" style="margin-bottom:0;">Add New Printer</h1>
            </div>
        </div>

        <section class="section">
            <div class="container">
                <?php
                if ($message) {
                    echo '<div class="notification is-success">'.$message.'</div>';
                }
                ?>
                <?php
                if ($error) {
                    echo '<div class="notification is-danger">'.$error.'</div>';
                }
                ?>
                <p class="subtitle">Please fill the from below to add printer.</p>

                <form action="add_printer.php" method="post" accept-charset="utf-8">

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label" for="title">Title</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input type="text" name="title" value="<?= $title; ?>" class="input" id="title">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label" for="type">Type</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select name="type" id="type">
                                            <option value="network"<?= $type == 'network' ? ' selected="selected"' : ''; ?>>Network</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label" for="profile">Profile</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select name="profile" id="profile">
                                            <option value="default"<?= $profile == 'default' ? ' selected="selected"' : ''; ?>>Default</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="network">
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label" for="ip_address">IP Address</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <input type="text" name="ip_address" value="<?= $ip_address; ?>" class="input" id="ip_address">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label" for="port">Port</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <input type="text" name="port" value="<?= !empty($port) ? $port : 9100; ?>" class="input" id="port">
                                    </div>
                                    <span class="help">Most printers are open on port <strong>9100</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal" style="margin-top:10px;">
                        <div class="field-label"></div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <button type="submit" name="add_printer" class="button is-primary">
                                        Add Printer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
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
<?php } 
else
{
        echo '<script>alert("Invalid Username/Password");window.location.href="index.php";</script>';
}?>
