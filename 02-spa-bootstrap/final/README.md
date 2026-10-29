# HelpDesk Web — SPA

O projeto funciona como uma Single Page Application usando HTML, CSS,
Bootstrap e JavaScript puro. As telas são renderizadas dinamicamente dentro
da `div#app`, sem a criação de vários arquivos HTML.

Funcionalidades:

- Dashboard com totais de chamados por status e prioridade alta;
- cadastro de chamados com prioridades geradas a partir de um array;
- badges visuais para prioridades e status;
- listagem com ações de visualização e encerramento;
- tela de detalhes com a solução dos chamados encerrados;
- encerramento com validação obrigatória da solução;
- dados mantidos em memória, sem banco de dados.

Os dados são perdidos quando a página é atualizada, pois ainda não existe
servidor ou persistência.
