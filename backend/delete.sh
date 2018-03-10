#!/bin/sh

docker stop $(docker ps -a -q --filter name="backend")
docker rm $(docker ps -a -q --filter name="backend")