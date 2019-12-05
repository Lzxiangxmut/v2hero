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

#sed -i 's/Port 22/Port $PORT/g' /etc/ssh/sshd_config
#sed -i 's/UsePrivilegeSeparation yes/UsePrivilegeSeparation no/g' /etc/ssh/sshd_config
#echo "PermitRootLogin yes" >> /etc/ssh/sshd_config

#echo "########### /etc/ssh/sshd_config ##############"
#cat /etc/ssh/sshd_config

#sed -i "s/listen 80/listen $PORT/g" /usr/local/nginx/conf/nginx.conf
#/etc/init.d/nginx start
#/etc/init.d/mysql start
#/etc/init.d/php-fpm start


#rm -rf /var/www/html && mv /www.codewasp.cn /var/www/html
#ls /var/www/html/
#sed -i "s/80/$PORT/g" /etc/nginx/sites-available/default
#/etc/init.d/nginx start

jupyter-notebook --allow-root --port $PORT
	
while true
do
  #wget --spider -q -T 5 -t 2 http://codewasp.herokuapp.com
  #echo result=$?
  #sleep 5
  #wget --spider -q -T 5 -t 2 https://cwproxy.herokuapp.com
  #echo result=$?
  #sleep 5
  #wget --spider -q -T 5 -t 2 https://cwv2ray.herokuapp.com
  #echo result=$?
  echo "###############################"
  netstat -anp
  echo "###############################"
  ps -aef
  sleep 600
done
