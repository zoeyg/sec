<?php
  require 'JWT.php';
  $authinfo = json_decode(file_get_contents("/var/www/authinfo.json"), true);

  # Used to use this to run the firmware update binary at /usr/bin/firmwareupdate
  # but this is too insecure so I'm setting this method aside for now till i do more testing.
  class AdminMethods
  {
    public function write_files()
    {
      $file = func_get_args();
      if (count($file) >= 2) {
        $fp = realpath($file[0]);
        if (is_writeable($fp) && is_file($fp) && $fp != '/var/www/authinfo.json' ) {
          $success = file_put_contents($fp, $file[1]);
          if ($success === FALSE) {
            return "Error Updating File $fp!";
          } else {
            return "$fp Updated!";
          }
        }
      }
    }

    public function read_file()
    {
      $files = func_get_args();
      $results = array();
      if (count($files) >= 1) {
        foreach($files as $file){
          $fp = realpath($file);
          if ( is_readable($fp) && is_file($fp) ) {
            $results[$file] = preg_replace( '/[^[:print:]\r\n\t]/', '', file_get_contents($fp));
          }
        }
      }
      return $results;
    }

    public function getprocesses()
    {
      return json_decode(shell_exec('A=`ps -aux | awk \'{if(NR>1)print "{\"user\":\""$1"\",\"pid\":"$2",\"cpu\":"$3",\"mem\":"$4",\"time\":\""$10"\",\"cmd\":\""$11"\"\},"}\' 2>/dev/null`; echo "[$A]" | sed "s/,]$/]/"'), true);
    }
  }

  class OldAdminMethod
  {
    // Will remove this later after testing more secure new admin class
    public $command;
    public $logname;

    function __construct($cmd="", $log='/var/www/db/cmdhist.log')
    {
      $this->command = $cmd;
      $this->logname = $log; 
    }

    public function readlog() {
      if (file_exists($this->logname) && is_readable($this->logname)) {
        return preg_replace( '/[^[:print:]\r\n\t]/', '', file_get_contents($this->logname));
      } 
    }
    
    function __destruct()
    {
      $stdout = shell_exec($this->command);
      if (strlen($stdout)) {
        if (is_writable(dirname($this->logname))) {
          file_put_contents($this->logname, "{$this->command}\n$stdout");
        }
      }
    }
  }

  function check_cookie($jwt){
    try { 
      if ( !isset($_COOKIE['elfinv']) ) { 
        return False;
      }
      return $jwt->decode($_COOKIE['elfinv']);
    } catch (Exception $e) {
      return False;
    }
  }
  function make_cookie($jwt, $user, $exp){
    return $jwt->encode(['user' => $user, 'expires' => $exp]);
  }

  header('Content-type: application/json; charset=utf-8');
  $data = [ 'request' => False, 'data' => 'Unknown admin request or not using POST.' ];
  if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
    $expiration = time() + (86400 * 1); // good for one day
    $jwt = new JWT($authinfo['secretkey'], 'HS256', $expiration, 10);
    $browser = get_browser(null, true);
    if (preg_match("/(Chrome|Safari|Firefox|Samsung|Edge|IE|Opera|Baidu|Chromium|Iceweasel|Android)/i", $browser["browser"])) {
      $data = [ 'request' => False, 'data' => 'No GUI For Browser - Use a command line tool or scripting language.' ];
    } elseif ( isset($_POST['username']) && isset($_POST['password']) ) { 
      foreach($authinfo['adminusers'] as $auser) {
        $data = [ 'request' => False, 'data' => 'Invalid Username or Password!' ];
        if ($auser["user"] == $_POST['username'] && $auser["pass"] == $_POST['password']) {
          $data = [ 'request' => True, 'data' => 'Successful Login!' ];
          $jwtck = make_cookie($jwt, $_POST['username'], $expiration);
          setcookie('elfinv', $jwtck, $expiration, "/");
          break;
        }
      }
    } else {
      $cookie = check_cookie($jwt);
      if ($cookie && isset($cookie['user']) && isset($cookie['expires'])) {
        if ($cookie['expires'] > time()) {
          //
          $AdminMethods = new AdminMethods();
          if (isset($_POST['method']) && isset($_POST['arguments']) && method_exists($AdminMethods, $_POST['method'])) { 
            try {
              // Looking to convert from string to array
              $arguments = unserialize($_POST['arguments']);
              ob_start();
              var_dump($arguments);
              $argresults = ob_get_clean();
              $results = call_user_func_array(array($AdminMethods, $_POST['method']), $arguments);
              $data = [ 'request' => True, 'data' => [ 'method' => $_POST['method'], 'arguments' => $argresults, 'results' => $results ] ];
            } catch (Exception $e) {
              $data = [ 'request' => False, 'data' => [ 'method' => $_POST['method'], 'arguments' => $argresults, 'results' => $e->getMessage() ] ];
            }
          }
        } else {
          $data = [ 'request' => False, 'data' => 'Cookie Has Expired!' ];
        }
      }
    }
  }
  echo json_encode($data);
?>