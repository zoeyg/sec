<?php
include("db.php");
session_start();
if($_SESSION["loggedin"])
{
	if(isset($_GET["job"]))
	{
		$job=$_GET["job"];
		$title=$_GET["title"];
		if($job==='delete')
		{
			$stmt=$conn->prepare("delete from jobs where title=?");
			$stmt->bind_param("s",$title);
			$stmt->execute();
			$message="Printer Deleted";
		}
		if($job==='print')
		{
			$stmt=$conn->prepare("select ip,port from jobs where title=?");
			$stmt->bind_param("s",$title);
			$stmt->execute();
			$result = $stmt->get_result();
			if($result->num_rows > 0)
			{
				$row = $result->fetch_assoc();
				$ip = $row["ip"];
				$port=$row["port"];
				$fp = fsockopen($ip,$port,$errno, $errstr, 20);
				if(is_resource($fp))
				{
					$message='Printer is up. Please add a <a href="job.php?title='.$title.'">job</a>';
				}
				else
				{
					$error = "Can't connect to the printer";
				}
			}
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
                <h1 class="title" style="margin-bottom:0;">List Printers</h1>
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
                <p class="subtitle">Please review the printer or try test printing.</p>

                <table class="table is-bordered is-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>IP Address</th>
                            <th>Port</th>
                            <th style="width:65px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
				$stmt=$conn->prepare("select title,ip,port from jobs");
				$stmt->execute();
				$result = $stmt->get_result();
				if ($result->num_rows > 0) {
				while($printer = $result->fetch_assoc()) {
                                echo '<tr>';
                                echo '<td>'.$printer["title"].'</td>';
                                echo '<td>'.$printer["ip"].'</td>';
                                echo '<td>'.$printer["port"].'</td>';
                                echo '<td class="has-text-centered"><span class="icon"><a href="printers.php?job=print&title='.$printer["title"].'" class="test-print"><img src="images/print.png" aslt="print"></a></span> <span class="icon"><a href="printers.php?job=delete&title='.$printer["title"].'"><input type="image" src="images/trash.png" alt="del" style="height:24px;" /></a></span></td>';
                                echo '</tr>';
                            }
                        } else {
                            echo '<tr><td colspan="7">No Printer has been added, please <a href="add_printer.php">add one</a>.</td></tr>';
                        }
                        ?>
                    </tbody>
                </table>

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

