#!/bin/bash
docker build -t waffles_order .
docker run --name=waffles_order --rm -p1337:80 -it waffles_order