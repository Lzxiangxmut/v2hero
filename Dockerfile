FROM ubuntu:16.04
#FROM alpine:latest
LABEL maintainer="https://github.com/onplus"

RUN apt-get update -y
RUN apt-get install -y jq vim git zip unzip wget curl net-tools iputils-ping openssh-server
RUN echo "root:CodeWasp1688" | chpasswd
RUN sed -i 's/Port 22/Port 80/g' /etc/ssh/sshd_config
RUN /etc/init.d/ssh restart

#CMD /entrypoint.sh
