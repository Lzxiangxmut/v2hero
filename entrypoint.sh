#!/usr/bin/env bash

jupyter-notebook --no-browser --no-mathjax --ip=* --port $PORT notebooks

while true
do
  echo "### ps -aef ###"
  ps -aef
  echo "### netstat -anp ###"
  netstat -anp
  sleep 30
done
