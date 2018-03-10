#!/bin/sh

BASEDIR=$(dirname "$0")
docker build -t backend:latest -f "$BASEDIR/Dockerfile" $BASEDIR