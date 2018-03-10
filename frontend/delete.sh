#!/bin/sh

docker stop $(docker ps -a -q --filter name="bartfrontend")
docker rm $(docker ps -a -q --filter name="bartfrontend")