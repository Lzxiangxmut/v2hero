FROM ubuntu:16.04
#FROM alpine:latest
LABEL maintainer="https://github.com/onplus"

RUN apt-get update -y
RUN apt-get install -y jq vim git zip unzip wget curl net-tools iputils-ping openssh-server
RUN echo "root:CodeWasp1688" | chpasswd
RUN curl -sSL "https://pekka-public.oss-cn-hongkong.aliyuncs.com/files/install_ssh.sh" | bash
RUN apt-get install -y python python-pip
RUN python -m pip install --upgrade pip

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh 
CMD /entrypoint.sh
