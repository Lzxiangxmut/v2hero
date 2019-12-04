#!/usr/bin/env bash

UserDir="/"
AppPort=$PORT
AppPort=8088
AppToken="4015bc9ee91e437d90df83fb64fbbe312d9c9f05"

mkdir -p /root/.jupyter/custom
cat > /root/.jupyter/jupyter_notebook_config.py << EOF
c.NotebookApp.ip = '*'
c.NotebookApp.port = $AppPort
c.NotebookApp.allow_origin = '*'
c.NotebookApp.allow_root = True
c.NotebookApp.open_browser = False
c.NotebookApp.trust_xheaders = True
c.NotebookApp.disable_check_xsrf = True
c.NotebookApp.allow_remote_access = True
c.NotebookApp.notebook_dir = u"$UserDir"
c.NotebookApp.tornado_settings = {"headers":{"Content-Security-Policy": "frame-ancestors * self *:$AppPort;"}}
c.NotebookApp.token = "$AppToken"
EOF

echo "### /root/.jupyter/jupyter_notebook_config.py ###"
cat /root/.jupyter/jupyter_notebook_config.py

	cat > /root/.jupyter/custom/custom.js << 'EOF'
define(['base/js/namespace'], function(Jupyter){
	Jupyter._target = '_self';
});
EOF
	chmod 777 -R /root/.jupyter/custom

while true
do
	echo "### jupyter-notebook --allow-root --port $PORT ###"
  jupyter-notebook --allow-root --port $PORT
  echo "### ps -aef ###"
  ps -aef
  echo "### netstat -anp ###"
  netstat -anp
  sleep 30
done
