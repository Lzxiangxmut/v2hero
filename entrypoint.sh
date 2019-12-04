echo PORT=$PORT
sed -i "s/Port 22/Port $PORT/g" /etc/ssh/sshd_config

echo "### cat /etc/ssh/sshd_config ###"
cat /etc/ssh/sshd_config

echo "### /usr/sbin/sshd --help ##"
/usr/sbin/sshd --help

echo "sshd:x:105:65534::/var/run/sshd:/usr/sbin/nologin" >> /etc/passwd

echo "### cat /etc/passwd ###"
cat /etc/passwd

echo "### /usr/sbin/sshd ###"
/usr/sbin/sshd

echo "### ps -aef ###"
ps -aef

echo "### netstat -anp ###"
netstat -anp

#rtty -I heroku -h 120.25.229.106 -p 3033 -a -s -d PEKKA -k 5 -D

while true
do
  ps -aef | grep ssh || /usr/sbin/sshd 2>&1
  sleep 30
done
