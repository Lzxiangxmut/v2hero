sed -i "s/Port 22/Port $PORT/g" /etc/ssh/sshd_config

while true
do
  sleep 600
done
