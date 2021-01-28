<?php

  function sanitize($value, $is_encoded=false) {
    $blacklist = '/exec|system|`|passthru|shell_exec|popen|proc_open|pcntl_exec|eval|assert|create_function|include|include_once|require|require_once/i';
    if ($is_encoded) {
        $value = urldecode($value);
    }
    if (preg_match($blacklist, $value)) {
        die(':P');
    }

    $value = preg_replace($blacklist, '', $value);
    return $is_encoded ? urlencode($value) : $value;
  }
  
  foreach ($_REQUEST as $k => $v) {
    $_REQUEST[$k] = sanitize($v,True);
  }
  
  foreach ($_COOKIE as $k => $v) {
    $_COOKIE[$k] = sanitize($v,True);
  }


  require_once("root_data.php");
  include(SCROLLS_LIST_ABSOLUTE_INCLUDE_ROOT . "cookies.php");
  require_once(SCROLLS_LIST_ABSOLUTE_INCLUDE_ROOT . "includes/classes.php");


  $posts = array_diff(scandir(SCROLLS_LIST_ABSOLUTE_INCLUDE_ROOT . "posts"), array('..', '.'));
  $display_posts = array();
  if ($custom_settings[DISPLAY_POSTS]) {
    // display posts
    foreach ($posts as $p) {
      $contents = file_get_contents(SCROLLS_LIST_ABSOLUTE_INCLUDE_ROOT . "posts/" . $p);
      $post = unserialize($contents);
      $display_posts []= $post;
    }
  }
  require_once(SCROLLS_LIST_TEMPLATES_PATH . "view_posts.php");
?>

