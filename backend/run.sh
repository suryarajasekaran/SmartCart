#!/bin/sh

docker run -d --name="backend" --link mongo:mongo -p 8881:8881 -m 50m bartbackend