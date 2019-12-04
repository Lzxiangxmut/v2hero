#!/usr/bin/env bash

pgcontents init -l $DATABASE_URL --no-prompt

jupyter notebook \
	--no-browser --no-mathjax --ip=* --port $PORT \
	--config=jupyterconfig.py \
	notebooks

while true
do
  echo "### ps -aef ###"
  ps -aef
  echo "### netstat -anp ###"
  netstat -anp
  sleep 30
done
