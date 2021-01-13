--Acessar o mysql com usuário root
mysql -uroot -p

--Listar as bases dados, verificar se a base nodedb existe
show databases;

--Acessar a base dados nodedb.
use nodedb;

--Criar a tabela people
create table people(id int not null auto_increment, name varchar(255), primary key(id)) ;