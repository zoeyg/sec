<?php
if (!@$_SESSION['userid']) {
    redir(".");
}

$userid = $_SESSION['userid'];
?>
      <div class="row">
        <div class="p-5 mx-auto col-10 col-md-10 bg-info">
          <h3 class="display-3">Choose template</h3>
          <div class="row">
<?php
foreach (glob("calcs/$userid/templates/*.html") as $template) {
    $uuid = basename($template, ".html");
    $colorFrom = substr($uuid, -12, 6);
    $colorTo = substr($uuid, -6, 6);
    $title = $uuid;
    if (preg_match('#<title>([a-z0-9 \#%&*()+:;",./?-]+)</title>#si', file_get_contents($template), $mt)) {
        $title = $mt[1];
    }
?>
            <div class="col-md-3">
              <a href='?p=calc&template=<?=$uuid?>'><div class="card my-2" style="	min-height: 200px;	background: linear-gradient(#<?=$colorFrom?>, #<?=$colorTo?>);">
                <div class="card-img-overlay d-flex justify-content-center align-items-center">
                  <p class="break lead text-white" style="	text-shadow: 1px 1px 2px black;"><?=htmlspecialchars($title)?></p>
                </div>
              </div></a>
            </div>
<?php
}
?>
            <div class="col-md-3">
              <a href='?p=newtemplate' title="New Template"><div class="card my-2" style="min-height: 200px; background: linear-gradient(rgba(148,249,6,0.6), rgba(26,102,0,0.8));">
                <div class="card-img-overlay d-flex justify-content-center align-items-center">
                  <h3 class="display-2 text-white" style="	text-shadow: 1px 1px 2px black;"><i class="fa fa-plus-square-o fa-fw fa-1x" style="padding-top: 0.2em"></i><br></h3>
                </div>
              </div></a>
            </div>
            <div class="col-md-3"></div>
            <div class="col-md-3"></div>
          </div>
        </div>
      </div>
