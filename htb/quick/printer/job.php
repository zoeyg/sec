<?php
require __DIR__ . '/escpos-php/vendor/autoload.php';
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\Printer;
include("db.php");
session_start();

if($_SESSION["loggedin"])
{
	if(isset($_POST["submit"]))
	{
		$title=$_POST["title"];
		$file = date("Y-m-d_H:i:s");
		file_put_contents("/var/www/jobs/".$file,$_POST["desc"]);
		chmod("/var/www/printer/jobs/".$file,"0777");
		$stmt=$conn->prepare("select ip,port from jobs");
		$stmt->execute();
		$result=$stmt->get_result();
		if($result->num_rows > 0)
		{
			$row=$result->fetch_assoc();
			$ip=$row["ip"];
			$port=$row["port"];
			try
			{
				$connector = new NetworkPrintConnector($ip,$port);
				sleep(0.5); //Buffer for socket check
				$printer = new Printer($connector);
				$printer -> text(file_get_contents("/var/www/jobs/".$file));
				$printer -> cut();
				$printer -> close();
				$message="Job assigned";
				unlink("/var/www/jobs/".$file);
			}
			catch(Exception $error) 
			{
				$error="Can't connect to printer.";
				unlink("/var/www/jobs/".$file);
			}
		}
		else
		{
			$error="Couldn't find printer.";
		}
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
                            <a href="printers.php" class="nav-item is-active">
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
            <div class="hero-body heading">
                <h1 class="title" style="margin-bottom:0;">Print Jobs</h1>
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
                <p class="subtitle">Please assign a job to printer.</p>
                <form action="job.php" method="post" accept-charset="utf-8">

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label" for="receipt_printer">Bill & Receipt Printer</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select name="title" id="receipt_printer">
                                            <?php
                                                    echo '<option value="'.$_GET["title"].'" selected="selected">'.$_GET["title"].'</option>';
                                            ?>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label" for="order_printers">Bill Details</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="select multiple is-fullwidth">
					<textarea name="desc" rows="7" cols="105"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal" style="margin-top:10px;">
                        <div class="field-label"></div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <button type="submit" name="submit" class="button is-primary">
                                        Print
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
    <script type="text/javascript">
        var printers = <?= !empty($printers) ? json_encode($printers) : '{}'; ?>;
    </script>
</body>
</html>
<?php } 
else
{
	echo '<script>alert("Invalid Username/Password");window.location.href="index.php";</script>';
}?>
