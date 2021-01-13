<h2 align="center"> 02 - Segundo desafio Nginx com Node.js - Docker Code Education -  </h2>
<p align="center">  
  <img alt="Made by Anderson Nobre" src="https://img.shields.io/badge/Made%20by-Anderson Nobre-%2304D361">

  <img alt="Made with Golang" src="https://img.shields.io/badge/Made%20with-Golang-%1f425f">  

  <img alt="Made with Docker" src="https://img.shields.io/badge/Made%20with-Docker-%1f425f">    

</p>

<h3> Objetivo </h3>

Nesse desafio você colocará em prática o que aprendemos em relação a utilização do nginx como proxy reverso. A idéia principal é que quando um usuário acesse o nginx, o mesmo fará uma chamada em nossa aplicação node.js. Essa aplicação por sua vez adicionará um registro em nosso banco de dados mysql, cadastrando um nome na tabela people.

O retorno da aplicação node.js para o nginx deverá ser:
<pre>
<h1>Full Cycle Rocks!</h1>
</pre>

- Lista de nomes cadastrada no banco de dados.

Gere o docker-compose de uma forma que basta apenas rodarmos: docker-compose up -d que tudo deverá estar funcionando e disponível na porta: 8080.

Suba tudo em um repositório e faça a entrega.

<h3> Solução </h3>

---- Configurar o ngnix ---------

- Criar o diretório ngnix no diretório raiz dockerdesafio02
- criar o arquivo Dockerfile
<pre>
FROM nginx:1.15.0-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ngnix.conf /etc/nginx/conf.d/
</pre>

- Criar o arquivo de configuração ngnix.conf
<pre>
server {
    listen 80;
    server_name sysmon.tecmint.lan;

    location / {
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_set_header X-NginX-Proxy true;
      proxy_pass         http://appnode:3000;
    }
}
</pre>

- Criar o arquivo docker-compose.yaml no diretório raiz dockerdesafio02
--Alterar o docker-compose, adicionando o serviço nginx
<pre>
  nginx:
    build: 
      context: ngnix
    image: nobre/ngnix:desafio02
    container_name: nginx
    ports:
      - "8080:80"
    networks:
    - node-network
</pre>
---- Configurar o node  ---------

- Criar o diretório node no diretório raiz dockerdesafio02
- criar o arquivo Dockerfile 
<pre>
FROM node:15 
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000
COPY . .
CMD ["node","index.js"] 
</pre>

- alterar o arquivo docker-compose.yaml]
<pre>
  appnode:
    build: 
      context: node
    image: nobre/node:desafio02
    container_name: appnode
    networks:
      - node-network
    volumes:
      - ./node:/usr/src/app
    tty: true
    ports:
      - "3000:3000" 
</pre>
<pre>
 no terminal acessar o diretório node.
-- executar o container node.

--iniciar um projeto node
npm init

--instalar o npm
apt npm install

--instalar express
npm install express --save

--instalar modulo mysql
npm install mysql

---- Configurar o mysql  ---------
--Criar o diretório mysql no diretório raiz dockerdesafio02
--Alterar o arquivo docker-compose, adicionando o serviço
</pre>
<pre>
  dbmysql:
    image: mysql:5.7
    command: --innodb-use-native-aio=0
    container_name: dbmysql
    restart: always
    tty: true
    volumes:
      - /home/nobre/docker/mysql/file_mysql:/var/lib/mysql
    environment:
      - MYSQL_DATABASE=nodedb
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_USER=root
    networks:
      - node-network
</pre>
<pre>
--Executar levantar os serviços, realizar o build, inciar o container
docker-compose up -d --build

--Acessar o container mysql para executar comandos
exec -it  dbmysql bash

--Acessar o mysql com usuário root
mysql -uroot -p

--Listar as bases dados, verificar se a base nodedb existe
show databases;

--Acessar a base dados nodedb.
use nodedb;

--Criar a tabela people
create table people(id int not null auto_increment, name varchar(255), primary key(id)) ;


--Voltar ao diretório node
Criar o arquivo index.js

--Executar levantar os serviços, realizar o build, iniciar o container
docker-compose up -d --build
</pre>
-- Acessar o browser através da URL http://localhost:8080/
