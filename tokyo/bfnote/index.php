<?php
require 'config.php';

header('X-Frame-Options: DENY');

$action = $_SERVER['REQUEST_METHOD'];

$db = new SQLite3('/tmp/db.sqlite3');
$db->exec('create table if not exists notes (id text, content text)');

if ($action === 'POST') {
  $content = $_POST['content'];
  $id = bin2hex(random_bytes(8));

  $content = preg_replace('/[^a-zA-Z0-9<>\[\]+-.,=\/\n\ ]/', '', $content);
  $content = str_replace('<', '&lt;', $content);
  $content = str_replace('>', '&gt;', $content);

  $stmt = $db->prepare('insert into notes values (:id, :content)');
  $stmt->bindValue(':id', $id, SQLITE3_TEXT);
  $stmt->bindValue(':content', $content, SQLITE3_TEXT);
  $stmt->execute();

  header("Location: /?id=${id}");
} else if ($action === 'GET') {
  if (isset($_GET['source'])) {
    highlight_file(__FILE__);
    exit();
  }

  if (!empty($_GET['id'])) {
    $id = $_GET['id'];
  
    $stmt = $db->prepare('select content from notes where id=:id');
    $stmt->bindValue(':id', $id, SQLITE3_TEXT);
    $res = $stmt->execute()->fetchArray(SQLITE3_ASSOC);

    if (empty($res)) {
      header('Location: /');
    }
  
    $content = $res['content'];
  }
}
?>
<!doctype html>
<html>
  <head>
    <title>bfnote</title>
<?php
  if (!empty($_GET['id'])) {
?>
    <script src="/js/bf.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.0.16/purify.min.js"></script>
    <script src="https://www.google.com/recaptcha/api.js"></script>
<?php
  }
?>
  </head>
  <body>
<?php
  if (empty($_GET['id'])) {
?>
    <!-- <a href="/?source">source</a> -->
    <form action="." method="post">
      <textarea name="content"></textarea>
      <input type="submit" value="share!"></input>
    </form>
<?php
  } else {
?>
    <script>
      function onSubmit(token) {
        fetch(`/report.php`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `id=<?=$id?>&token=${token}`,
        }).then(r => r.json()).then(d => {
          if (d['success']) {
            alert('successfully shared');
          }
          else {
            alert(`error: ${d['msg']}`);
          }
        })
      }
    </script>
    <div id="program"><?=$content?></div>
    <div id="output"></div>
    <form id="share">
      <button class="g-recaptcha" data-sitekey="<?=$SITE_KEY?>" data-callback="onSubmit">report</button>
    </form>
<?php
  }
?>
  </body>
</html> 