FROM ubuntu:16.04
#FROM alpine:latest
#LABEL maintainer="https://github.com/onplus"

RUN apt-get update -y
RUN apt-get install -y jq vim git zip unzip wget curl net-tools iputils-ping openssh-server
RUN echo "root:CodeWasp1688" | chpasswd
RUN apt-get install -y nginx
#RUN apt-get install -y python python-pip 
#RUN python -m pip install --upgrade pip
#RUN pip install --upgrade setuptools
#RUN pip install six --upgrade --ignore-installed six
#RUN pip install tornado==5.1.1
#RUN pip install ipython==5.8.0
#RUN pip install ipykernel==4.10.0
#RUN pip install jupyter_console==5.2.0
#RUN pip install jupyter
#RUN pip install bash_kernel
#RUN python -m bash_kernel.install
#ADD jupyterconfig.py /jupyterconfig.py
#RUN mkdir -p /notebooks
ADD entrypoint.sh /entrypoint.sh
RUN chmod 777 /entrypoint.sh 

CMD /entrypoint.sh
