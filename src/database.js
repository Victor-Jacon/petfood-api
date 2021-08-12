const mongoose = require('mongoose');

/* A uri é uma variável que vai salvar tipo a url do nosso banco de dados, dou o nome de URI por ser convenção. */
/* Não é preciso criar o banco de dados, pq quando a gente criar a primeira linha de registro do nosso banco de dados, @ele vai criar automaticamente o banco de dados com o nome petfood */
const URI = 'mongodb://localhost/petfood'

/* Configurações padrão do mongoose - só copiar e colar entre projetos */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('debug', true); /* Ele faz um log no terminal de todas as operações que estão sendo feitas no banco de dados, tudo que está sendo inserido no db, deletado, todos os comandos que estão rodando por trás no mongoose.*/

mongoose
.connect(URI) /* Passamos a uri que criamos acima para realizar a conexão */
.then(() => console.log('DB is up')) /* o then significa quando concluir o passo anterior, faça... que basicamente significa que quando concluir a conexão com o db, se tudo correr bem, mostre no console que o db está online */
.catch((err) => console.log(err)) /* Execute um catch, que é um bloco de código para capturar erros, passe err (erro) como parâmetro, e caso ele capture um erro, mostre no console este erro */

