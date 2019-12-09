FROM ubuntu:16.04

RUN apt-get update -y
RUN apt-get install -y vim tar zip sudo unzip wget curl net-tools iputils-ping openssh-client openssh-server 

#RUN apt-get install -y nginx
#ADD www.codewasp.cn /www.codewasp.cn

RUN wget -c http://soft.vpser.net/lnmp/lnmp1.6-full.tar.gz && tar zxf lnmp1.6-full.tar.gz
ADD install.sh /lnmp1.6-full/install.sh
ADD main.sh /lnmp1.6-full/include/main.sh
RUN chmod 777 /lnmp1.6-full/install.sh
RUN cd lnmp1.6-full && ./install.sh lnmp
ADD www.codewasp.cn /www.codewasp.cn
RUN rm -rf /home/wwwroot/default && mv /www.codewasp.cn /home/wwwroot/default

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
