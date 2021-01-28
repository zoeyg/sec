<?php
if (!@$_SESSION['userid']) {
    redir(".");
}

$userid = $_SESSION['userid'];

$error = false;

if (trim(@$_POST['html'])) {
    do {
        $html = trim($_POST['html']);
        if (strpos($html, '<?') !== false) {
            $error = "Bad chars";
            break;
        }
        
        $requiredBlocks = [
            'id="back"',
            'id="field" name="field"',
            'id="digit0"',
            'id="digit1"',
            'id="digit2"',
            'id="digit3"',
            'id="digit4"',
            'id="digit5"',
            'id="digit6"',
            'id="digit7"',
            'id="digit8"',
            'id="digit9"',
            'id="plus"',
            'id="equals"',
        ];
        
        foreach ($requiredBlocks as $block) {
            if (strpos($html, $block) === false) {
                $error = "Missing required block: '$block'";
                break(2);
            }
        }
        
        $uuid = uuid();
        if (!file_put_contents("calcs/$userid/templates/$uuid.html", $html)) {
            $error = "Unexpected error! Contact orgs to fix. cybrics.net/rules#contacts";
            break;
        }
        
        redir(".");
    } while (false);
}
?>
      <div class="row">
        <div class="p-5 mx-auto col-10 col-md-10 bg-info">
<?php
if ($error) {
?>
          <div class="alert alert-danger" role="alert">
            <button type="button" class="close" data-dismiss="alert">×</button>
            <h4 class="alert-heading">Error</h4>
            <p class="mb-0"><?=htmlspecialchars($error)?></p>
          </div>
<?php
}
?>
          <h3 class="display-3">New template</h3>
          <div class="px-4 order-1 order-md-2 col-lg-12">
            <h2 class="mb-4">Insert code</h2>
            <form method="POST">
              <div class="form-group"> <textarea style="min-height: 100px; font-family: 'Fira Code', Consolas, monospace;" placeholder="HTML" class="form-control form-control-sm" name="html" oninput="this.style.height = ''; this.style.height = (this.scrollHeight + 10) +'px'"><?=htmlspecialchars(@$_POST['html'])?></textarea> </div> <button type="submit" class="btn btn-lg btn-outline-secondary mx-3 px-3"><i class="fa fa-plus-square fa-fw fa-1x py-1"></i> Create Template</button>
            </form>
          </div>
        </div>
      </div>
