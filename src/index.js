const express = require('express') /* Express 1 - Importa o express para o projeto */
const app = express(); /* Express 2 - Inicia o express e salva a referência dele na variável app */

const cors = require('cors'); /* Cria permissão para que nosso localhost envie requisições para o servidor */
const morgan = require ('morgan'); /* Ele dá analytics das requisiões ao nosso server, quanto tempo durou, qual foi o payload recebido, é um logger. */
const bodyParser = require('body-parser'); /* Ele permite nosso server de receber arquivos json */

/* importo a configuração do database pro nosso server */
require('./database');

app.set('port', process.env.PORT || 8000); /* Para a variável port, use o valor seguinte. Este valor pode ser o que estiver setado em um arquivo .env, se não tiver nenhuma arquivo .env setando a porta, use o valor padrão de 8000 */
app.use(cors()); /* Inicia o cors */
app.use(morgan('dev')) /* Inicia o morgan, somente no ambiente de desenvolvimento */
app.use(express.json()); /* A gente deu preferência para o método próprio do express para receber requisições em json, então não vamos usar mais o body parser, vou manter as infos sobre o body parser aqui só por fins de documentação mesmo */

/* Rotas API 4 
Insira a rota pra quando for enviada uma requisição para o path /, logo em seguida importe o módulo de rotas que criamos.
*/
app.use('/', require('./routes/main.routes'))

/* Express 3
Faz o servidor escutar na porta 8000, ou na porta que estiver definida no arquivo .env, conforme o valor que estiver salvo na variavel port que definimos em app.set
Caso alguém tente acessar essa porta, envie uma msg no console dizendo que o server está online */
app.listen(app.get('port'), () => {
    console.log('Server is up.');
})