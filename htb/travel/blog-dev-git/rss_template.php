<?php
/*
Template Name: Awesome RSS
*/
include('template.php');
get_header();
?>

<main class="section-inner">
	<?php
	function get_feed($url){
     require_once ABSPATH . '/wp-includes/class-simplepie.php';	    
     $simplepie = null;	  
     $data = url_get_contents($url);
     if ($url) {
         $simplepie = new SimplePie();
         $simplepie->set_cache_location('memcache://127.0.0.1:11211/?timeout=60&prefix=xct_');
         //$simplepie->set_raw_data($data);
         $simplepie->set_feed_url($url);
         $simplepie->init();
         $simplepie->handle_content_type();
         if ($simplepie->error) {
             error_log($simplepie->error);
             $simplepie = null;
             $failed = True;
         }
     } else {
         $failed = True;
     }
     return $simplepie;
 	 }

 	$url = $_SERVER['QUERY_STRING'];
	if(strpos($url, "custom_feed_url") !== false){
		$tmp = (explode("=", $url)); 	
		$url = end($tmp); 	
 	 } else {
 	 	$url = "http://www.travel.htb/newsfeed/customfeed.xml";
 	 }
 	 $feed = get_feed($url); 
     if ($feed->error())
		{
			echo '<div class="sp_errors">' . "\r\n";
			echo '<p>' . htmlspecialchars($feed->error()) . "</p>\r\n";
			echo '</div>' . "\r\n";
		}
		else {
	?>
	<div class="chunk focus">
		<h3 class="header">
		<?php 
			$link = $feed->get_link();
			$title = $feed->get_title();
			if ($link) 
			{ 
				$title = "<a href='$link' title='$title'>$title</a>"; 
			}
			echo $title;
		?>
		</h3>
		<?php echo $feed->get_description(); ?>

	</div>
	<?php foreach($feed->get_items() as $item): ?>
		<div class="chunk">
			<h4><?php if ($item->get_permalink()) echo '<a href="' . $item->get_permalink() . '">'; echo $item->get_title(); if ($item->get_permalink()) echo '</a>'; ?>&nbsp;<span class="footnote"><?php echo $item->get_date('j M Y, g:i a'); ?></span></h4>
			<?php echo $item->get_content(); ?>
			<?php
			if ($enclosure = $item->get_enclosure(0))
			{
				echo '<div align="center">';
				echo '<p>' . $enclosure->embed(array(
					'audio' => './for_the_demo/place_audio.png',
					'video' => './for_the_demo/place_video.png',
					'mediaplayer' => './for_the_demo/mediaplayer.swf',
					'altclass' => 'download'
				)) . '</p>';
				if ($enclosure->get_link() && $enclosure->get_type())
				{
					echo '<p class="footnote" align="center">(' . $enclosure->get_type();
					if ($enclosure->get_size())
					{
						echo '; ' . $enclosure->get_size() . ' MB';
					}
					echo ')</p>';
				}
				if ($enclosure->get_thumbnail())
				{
					echo '<div><img src="' . $enclosure->get_thumbnail() . '" alt="" /></div>';
				}
				echo '</div>';
			}
			?>

		</div>
	<?php endforeach; ?>
<?php } ?>
</main>

<!--
DEBUG
<?php
if (isset($_GET['debug'])){
  include('debug.php');
}
?>
-->

<?php get_template_part( 'template-parts/footer-menus-widgets' ); ?>

<?php
get_footer();


