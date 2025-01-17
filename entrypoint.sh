#!/usr/bin/env bash

UserDir="/"
AppPort=$PORT
#AppPort=8088
AppToken="8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"

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
#c.NotebookApp.password = 'sha1:d0270e88f33b:212384922803ca9bd49d1fb6c11ab42651ccb358'
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

#sed -i "s/Port 22/Port $PORT/g" /etc/ssh/sshd_config
#sed -i 's/UsePrivilegeSeparation yes/UsePrivilegeSeparation no/g' /etc/ssh/sshd_config
#sed -i 's/PermitRootLogin prohibit-password/#PermitRootLogin prohibit-password/g' /etc/ssh/sshd_config
#echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
#cat /etc/passwd
#echo "########### /etc/ssh/sshd_config ##############"
#cat /etc/ssh/sshd_config
#/etc/init.d/ssh restart
#/usr/sbin/sshd &

jupyter-notebook --allow-root --port $PORT &
	
while true
do
  wget --spider -q -T 5 -t 2 http://codewasp.herokuapp.com
  echo result=$?
  sleep 5
  wget --spider -q -T 5 -t 2 https://cwproxy.herokuapp.com
  echo result=$?
  sleep 5
  wget --spider -q -T 5 -t 2 https://cwv2ray.herokuapp.com
  echo result=$?

  echo "###############################"
  netstat -anp
  echo "###############################"
  ps -aef
  echo "##############################"
  sleep 600
done
