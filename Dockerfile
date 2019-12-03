FROM ubuntu:16.04
#FROM alpine:latest
LABEL maintainer="https://github.com/onplus"

RUN apt-get update -y
RUN apt-get install -y jq vim git zip unzip wget curl net-tools iputils-ping openssh-server
RUN echo "root:CodeWasp1688" | chpasswd
#RUN sed -i 's/Port 22/Port /g' /etc/ssh/sshd_config
RUN /etc/init.d/ssh restart
#RUN curl -sSL "https://pekka-public.oss-cn-hongkong.aliyuncs.com/files/install_ssh.sh" | bash

CMD /entrypoint.sh
