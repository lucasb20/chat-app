# Raissa
Um aplicativo de rede social feito em React, Nodejs e Django.

* É um aplicativo que abre um site, em que você pode ter uma conta local e entrar em um chat global. Você consegue se registrar, se logar e entrar no chat público com outros usuários que conseguiram logar.

* O nome do aplicativo é Raissa porque eu acho esse um nome bonito. Algo semelhante a linguagem Julia, que não foi escolhido em homenagem a alguma desenvolvedora da linguagem, simplesmente acharam um bom nome para se usar.

* O aplicativo está desenvolvido com o frontend em React, consumindo uma API em Django e um servidor websocket em nodejs.

* Instruções para instalação:
  - Para iniciar o projeto do frontend e do servidor WS, precisará do NPM e Node instalados.

  - Para instalar todas as dependências do frontend e do websocket-server, basta entrar na pasta de cada um deles e executar o comando 'npm install'.

  - Para instalar todas as dependências do backend, basta entrar na pasta dele e executar o comando 'pip install -r requirements.txt'.

  - Execute 'python manage.py runserver' para iniciar o modo de desenvolvimento do backend, e 'npm run dev' para inicar o modo de desenvolvimento do frontend e do websocket-server.

* Algumas screenshots:
    - Tela Inicial
    ![Tela inicial](other/Screenshot1.png)

    - Tela de login
    ![Tela de login](other/Screenshot2.png)

    - Conversa no chat
    ![Conversa no chat](other/Screenshot3.png)

* Créditos:
    - favicon -> Programador icon by Icons8 - https://icons8.com/

* Ideias a se considerar:
    - Talvez trocar esse nome, né?
    - Melhorar a programação do chat. Tem alguns problemas como quando há mensagens demais, cria um Scroll, e você tem que rolar para ver as mensagens anteriores, além do visual em si estar meio estranho.
