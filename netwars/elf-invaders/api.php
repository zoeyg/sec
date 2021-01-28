<?php
  // Made By Alabaster Snowball on 5/1/2019
  function get_db() {
    $dbname = '/var/www/db/elfinvaders.sqlite';
    if (file_exists($dbname) && filesize($dbname) > 500000) {
      unlink($dbname);
    }
    $db = new SQLite3($dbname, SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
    if ( !$db->querySingle('SELECT count(*) FROM sqlite_master WHERE type="table" AND name="entries"') ) {
      $db->query('CREATE TABLE IF NOT EXISTS "entries" (
        "name" VARCHAR,
        "points" INTEGER,
        "wins" INTEGER,
        "ip" VARCHAR,
        "timestamp" INTEGER
      )');
      // Use some default filler users for players to see.
      $initjson = file_get_contents("init.json");
      $array = json_decode($initjson, true);
      //ob_start();
      //var_dump($array);
      //error_log(ob_get_clean());
      //fwrite(STDERR, serialize($array) . "\n");
      foreach($array as $entry){
        $statement = $db->prepare('INSERT INTO "entries" ("name", "points", "wins", "ip", "timestamp")
        VALUES (:name, :points, :wins, :ip, :timestamp)');
        $statement->bindValue(':name', $entry['name']);
        $statement->bindValue(':points', intval($entry['points']));
        $statement->bindValue(':wins', intval($entry['wins']));
        $statement->bindValue(':ip', 'na');
        $statement->bindValue(':timestamp', 1);
        $statement->execute();
      }
    }
    return $db;
  }

  header('Content-type: application/json; charset=utf-8');
  $data = [ 'request' => False, 'data' => 'Unknown request or not using POST.' ];
  if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
    $www_dir = '/var/www';
    if ( isset($_POST['name']) && isset($_POST['wins']) && isset($_POST['score']) ) {
      $db = get_db();
      $date = new DateTime();
      $timestamp = $date->getTimestamp();
      $dbts = intval( $db->querySingle('SELECT timestamp FROM "entries" WHERE "ip" = "' . $_SERVER['REMOTE_ADDR'] . '"' ) );
      if ( $dbts ) { 
        if ( $dbts < $timestamp ) {
          $db->query('DELETE FROM "entries" WHERE "ip" = ' . $_SERVER['REMOTE_ADDR']);
        } else {
          $data = [ 'request' => False, 'data' => 'Too many submit requests (only 1 allowed per 15 seconds).' ];
        }
      }
      if (!$dbts || $dbts < $timestamp) {
        $name = substr(preg_replace("/[^\w]/", "", strval($_POST['name']) ), 0, 20);
        $wins = intval(preg_replace("/[^\d]/", "", strval($_POST['wins']) ));
        $score = intval(preg_replace("/[^\d]/", "", strval($_POST['score']) ));
        if (!empty($name) && $score) {
          $statement = $db->prepare('INSERT INTO "entries" ("name", "points", "wins", "ip","timestamp")
          VALUES (:name, :points, :wins, :ip, :timestamp)');
          $statement->bindValue(':name', $name);
          $statement->bindValue(':points', $score);
          $statement->bindValue(':wins', $wins);
          $statement->bindValue(':ip', $_SERVER['REMOTE_ADDR']);
          $statement->bindValue(':timestamp', $timestamp+15);
          $statement->execute();
          $data = [ 'request' => True, 'data' => 'Score Submitted!' ];
          if ($score > 9000){
            $data = [ 'request' => True, 'data' => 'Score Level Over 9000!' ];
          }
        } else {
          $data = [ 'request' => False, 'data' => 'Name or Score Invalid!' ];
        }
      }
    } elseif ( isset($_POST['scores']) ) {
      $db = get_db();
      $highscores=array();
      $results = $db->query('SELECT "name","wins","points" FROM "entries" ORDER BY points DESC LIMIT 20');
      while ($row = $results->fetchArray()) {
        array_push($highscores, array(
          "name" => $row["name"],
          "wins" => $row["wins"],
          "points" => $row["points"]
        ));
      }
      //fwrite(STDERR, serialize($result) . "\n");
      $data = [ 'request' => True, 'data' => $highscores ];
    } elseif ( isset($_POST['conf']) ) {
      $config = realpath($www_dir . '/config/' . $_POST['conf']);
      if (file_exists($config) && is_readable($config) && substr( $config, 0, strlen($www_dir) ) === $www_dir && $config != '/var/www/authinfo.json') {
        $handle = fopen($config, "rb");
        # Sending it out hex encoded for better json
        $data = [ 'request' => True, 'data' => bin2hex(fread($handle, filesize($config))) ];
        fclose($handle);
      } else {
        $data = [ 'request' => False, 'data' => 'Configuration File Not Found!' ];
      }
    } elseif ( isset($_POST['list']) ) {
      $dir = realpath($www_dir . '/html/' . $_POST['list']);
      if (is_readable($dir) && is_dir($dir) && substr( $dir, 0, strlen($www_dir) ) === $www_dir) {
        $data = [ 'request' => True, 'data' => scandir($dir) ];
      } else {
        $data = [ 'request' => False, 'data' => 'Directory not found in web root for listing.' ];
      }
    }
  }
  echo json_encode($data);