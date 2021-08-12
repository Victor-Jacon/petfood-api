/* Rotas API - 1 
Salva referência do nosso servidor express na variável express
Salva referência do módulo que cuida das rotas no server, na variavel Router
*/
const express = require('express');
const router = express.Router();

/* Rotas API - 3 -
Usando o método get do router do express, quando o usuário tentar acessar a home /, vai ser executada uma função asíncrona, que vai receber a requisição e enviar uma resposta.
Esta função async vai tentar executar o bloco a seguir, se tudo correr bem, vai dizer que o erro foi falso, e mostrar hello world.
Se der erro e cair um erro no catch, ele vai dizer que deu erro, e mostrar a mensagem do erro.
*/
router.get('/', async (req, res) => {
    try {
        res.json({error:false, message: 'Hello World'})
    } catch (err) {
        res.json({ error:true, message: err.message })
    }
})


/* Rotas API - 2
Exporta o arquivo de rotas pra gente usar em outros lugares da nossa api
*/
module.exports = router;