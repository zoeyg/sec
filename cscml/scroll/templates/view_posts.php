<?php
  $title = "Scroll's Blog";
  $blurb = "For all of your Scroll-related needs.";
  include(SCROLLS_LIST_TEMPLATES_PATH . "header.php");
  foreach ($display_posts as $post) {
    $html = $post->display_post();
?>
      <div class="row">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              <?php echo $post->get_title(); echo "\n"; ?>
            </h3>
          </div>
          <div class="panel-body">
            <?php echo $html; echo "\n"; ?>
          </div>
        </div>
      </div>
<?php
  }
  include(SCROLLS_LIST_TEMPLATES_PATH . "footer.php");
?>

