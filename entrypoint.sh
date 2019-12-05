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
c.NotebookApp.password = 'sha1:d0270e88f33b:212384922803ca9bd49d1fb6c11ab42651ccb358'
c.NotebookApp.tornado_settings = {"headers":{"Content-Security-Policy": "frame-ancestors * self *:$AppPort;"}}
c.NotebookApp.token = "$AppToken"
EOF

#echo "### /root/.jupyter/jupyter_notebook_config.py ###"
#cat /root/.jupyter/jupyter_notebook_config.py

cat > /root/.jupyter/custom/custom.js << 'EOF'
	define(['base/js/namespace'], function(Jupyter){
	Jupyter._target = '_self';
});
EOF
chmod 777 -R /root/.jupyter/custom

cat > /root/.jupyter/ssh_key << 'EOF'
-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAzYpO3dCBMB5rCHvtKj5zEsXRmkDF/uJqt5cSGwpyKsy4SDWh
eA4/CO2XoTZ9mcXpQsYmleYcQ45W75UxxrI9ZcL4edDL95t5/NYEkCFOeYNOOp0q
TUQi9aZH6gGrlFGXkJeJY4jxy3tEZOWcsBu3XV3uvTmIoivqLmxD6XOoS3dBEe7g
kHTWkoQp6fD+kofY0vWddmJilUaPo44j+tMN1WUT2h7WCm3IHXpYjAIKM60ZLSNg
6bX2BZyee/3I5aqXwpy06oC4s0OUn+zaC5zJP+t3q/zWaf5mlrK98h/y1glkrNdZ
3h04PMdFb9aPl6k9tidlpnVw+GcjAq9kLc50BwIDAQABAoIBAHezf6CwqDv0yxLC
0WkTu4KIUDxMUsLQ66OFyJaU684/MWdkTGgVq+IwNGk/yb//QYyQx7HutDEnuTuI
INf9v8H+3SRcVB0cn9t+bGPf8crUjH+YPiWHc/Cp6SG/3UPgjKs5hVrBS0fcvwUf
r7PkQFKQvNPYqNkBSD3G8XoI0E851J7XMgvrsJuF9YTYSyZm/0BR7yowTq6+Tyag
ig6TaRLW5DXy5cpCIXjHGyQw0BwAhTl/lbSWLs2CJOAEoWxxOQIaS7aGffc7lc/A
geUiMIadx+A57O6W7ld6geZIq/Cw5zp83QL/XYsQqoj68pwNckJmC5ei30tgnR7Y
a7H275kCgYEA/4rRROHqVrbZF85Q2u79UMKRqsa16v+5f9Mf+A+xi0GEDQxSAdsk
IHXI2IysCq4VGVmeRT9QSlutBIM6ECaTp8/4U9oHq+2npmd9QcP1TY2Pk4JkSQng
2bjNnLHZ4DS54BGc4Q5dnDtDJBxVOyNVcihICajfM4f1hTHnGVBJHrsCgYEAzeiP
vc0nut44TrQcrn1y82LuFTpz3wnKKqThqvSID7LteaDcK5uC9uV/cz6lpWVvNdct
Pzan1gsDEgMqDY+CimBCLz/8h/RbEe2erRvSLz9aN8NWNWlfXQbwPBhodAZ8Tbld
Ld795aZgA4HzUU8DjYaIWEG3mJ/KriNhRTjKWSUCgYEA2HXkUm7zq8RzHIE9aFas
6S4HahusmYVIwog6OkxA3m7+xna7OKtCbOSY3yY5zUoswS5yrMG252XEp1/pXSjw
RmQaPB0iBnbnXkOnjH/LWIgjKJZ5EI13k7XBJYxZvFutX6pLszASB3cDpqEBaXjC
tlJ8wwHzH5l5Vfwxf/XMGmUCgYEAuhiI6RKk6Lf0jfUswuswXBY6dUcp+Beh9t6j
8l0lJ4MgK8AdnO/k8n3CrYaeMRi25SM/ipU8JTA4qyve8viUE7ohtxCOjNVlBZQL
yAqP8RHB2QobPRSqEqq1rqqkpNBDwf9Y3p9eOxMeTa1CGmdeH6fKTHHAnBk3FiF1
xRkpkF0CgYEArOKW6vMa1cxSY4hdeC/tUo+jP6pqZSpKo8y3w1JAoSrdL916UFuG
8KKIgjGttpI6fkqwCyQ80AJN/J79oOdUneGw6KhQO0oxNFDnRfAdERCeCg9xBfQG
PaKZOkuWjjaplBUcsNCrwxJnUGLPv9vgdPv7aRFR+9d3GEkPwp8yD6c=
-----END RSA PRIVATE KEY-----
EOF
chmod 600 /root/.jupyter/ssh_key

#sed -i "s/Port 22/Port $PORT/g" /etc/ssh/sshd_config
sed -i 's/UsePrivilegeSeparation yes/UsePrivilegeSeparation no/g' /etc/ssh/sshd_config
echo "PermitRootLogin yes" >> /etc/ssh/sshd_config

cat /etc/passwd

echo "########### /etc/ssh/sshd_config ##############"
cat /etc/ssh/sshd_config

/etc/init.d/ssh restart

/usr/sbin/sshd &

#sed -i "s/listen 80/listen $PORT/g" /usr/local/nginx/conf/nginx.conf
#/etc/init.d/nginx start
#/etc/init.d/mysql start
#/etc/init.d/php-fpm start


#rm -rf /var/www/html && mv /www.codewasp.cn /var/www/html
#ls /var/www/html/
#sed -i "s/80/$PORT/g" /etc/nginx/sites-available/default
#/etc/init.d/nginx start

#jupyter-notebook --allow-root --port 9090 &
	
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
  ssh -i /root/.jupyter/ssh_key -N -o TCPKeepAlive=yes -o ServerAliveInterval=10 -o ServerAliveCountMax=3 -o StrictHostKeyChecking=no -o ConnectTimeout=10 -o ExitOnForwardFailure=yes -R 22202:127.0.0.1:22 -p 22 pekka@120.25.229.106 -v
  sleep 600
done
