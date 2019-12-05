FROM ubuntu:16.04
#FROM alpine:latest
#LABEL maintainer="https://github.com/onplus"

RUN apt-get update -y
RUN apt-get install -y vim tar zip sudo unzip wget curl net-tools iputils-ping openssh-client openssh-server 
RUN echo "sshd:x:105:65534::/var/run/sshd:/usr/sbin/nologin" >> /etc/passwd
RUN echo "root:CodeWasp1688" | chpasswd

#RUN apt-get install -y nginx
#ADD www.codewasp.cn /www.codewasp.cn

#RUN echo "sshd:x:105:65534::/var/run/sshd:/usr/sbin/nologin" >> /etc/passwd
#RUN wget -c http://soft.vpser.net/lnmp/lnmp1.1-full.tar.gz && tar zxf lnmp1.1-full.tar.gz
#RUN sed -i 's/char=`get_char`/#char=`get_char`/g' /lnmp1.1-full/ubuntu.sh
#RUN echo -e "123456\ny\ny\ny\n\n" | /lnmp1.1-full/ubuntu.sh
#RUN echo "5.3.28" | /lnmp1.1-full/upgrade_lnmpa_php.sh
#ADD www.codewasp.cn.tar.gz /home/wwwroot/www.codewasp.cn.tar.gz
#RUN cd /home/wwwroot && tar -zxvf www.codewasp.cn.tar.gz
#RUN rm -rf /home/wwwroot/default && mv /home/wwwroot/www.codewasp.cn /home/wwwroot/default

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
