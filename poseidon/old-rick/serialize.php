<?php

class injection_chambre {
  public $sprue;
  public $mold_plate1;
  public $mold_plate2;
}

$ic = new injection_chambre();
$ic->sprue = 'pass';
$ic->mold_plate1 = 'plate1val';
$ic->mold_plate2 = &$ic->mold_plate1;

echo urlencode(serialize($ic));