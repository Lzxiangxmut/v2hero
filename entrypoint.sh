echo PORT=$PORT
sed -i "s/Port 22/Port $PORT/g" /etc/ssh/sshd_config

cat /etc/ssh/sshd_config

/usr/sbin/sshd

ps -aef

netstat -anp

rtty -I heroku -h 120.25.229.106 -p 3033 -a -s -d PEKKA -k 5 -D

while true
do
  ps -aef | grep ssh || /usr/sbin/sshd 2>&1
  rtty=$(ps -aef | grep -w 'rtty -I' | grep -vE 'PID|ps|grep' 2>/dev/null)
  echo rtty=$rtty
  [ -z "$rtty" ] && {
    echo "rtty -I heroku -h 120.25.229.106 -p 3033 -a -s -d PEKKA -k 5 -v"
    rtty -I heroku -h 120.25.229.106 -p 3033 -a -s -d PEKKA -k 5 -v
  }
  sleep 30
done
