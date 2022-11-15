# projetoReact - Enzo Fogolari

## Ferramentas necessárias

### PHP
Para executar o projeto é necessário ter instalado o php, durante o desenvolvimento foi utilizada a [versão 8.1.12](https://windows.php.net/download#php-8.1)
### GIT
Para clonar o projeto é necessário ter feito a [instalação do git](https://gitforwindows.org/)
### Node.js
Também é preciso instalar o node.js, durante o desenvolvinento foi utilizada a [versão 18.3.0](https://nodejs.org/en/download/) (Importante baixar com NPM)
### MySQL
Para subir o banco de dados é necessário baixar o [MySQL 8.0](https://dev.mysql.com/downloads/installer/)

## Clonando e Configurando o Projeto

### GIT
Criar uma pasta com o nome que preferir, abrir nela o git bash ou executar o terminal dentro dela através de uma IDE e executar o 
comando git clone https://github.com/Fogolar1/projetoReact.git. Toda a estrutura do projeto será criada dentro da pasta projetoReact.

### Dependências do projeto
Para baixar as dependências do projeto, basta ir até a pasta frontend através do terminal e executar o comando npm install. Todas as dependências do projeto como
jquery, react, react-router-dom vão ser instaladas na pasta node_modules.

## Subindo o projeto

### FrontEnd
Para subir o frontend basta entrar novamente na pasta frontend e executar o comando npm start (IMPORTANTE : subir o projeto de frontend na porta 3000, caso não
seja possível, alterar o arquivo connection.php para a porta utilizada)

### BackEnd
Para subir o backend é preciso entrar na pasta php do projeto e executar o comando php -S localhost:8000 (IMPORTANTE : subir o projeto do backend na porta 8000 para 
não prejudicar com todos os requests feitos por frontEnd)

### Banco de dados
Baixar o [backup do banco de dados](https://drive.google.com/drive/folders/1wC7cIezd6cEQUxPmga9PykMBFSU2tcP1?usp=sharing) e realizar o import dele no MySQL, é importante que a conexão se dê com o nome de usuário e senha que estão contidos no
arquivo connection.php, caso contrário é necesário mudá-los
