<?php

$s = "REPLACE_SWITCH";
$a = "REPLACE_ARG";

// current user
if ($s)
switch ($s) {
    case "file":
        echo file_get_contents($a);
        break;
    case "dir":
        echo implode(scandir($a), "\n");
        break;
    case "user":
        print_r(get_defined_constants(true));
        break;
    case "ffi":
        $ffi = FFI::cdef(
            'void printf(char *const str, ...);',
            'libc.so.6'
        );
        $ffi->printf("Hello %s!\n", "world");
    break;
}