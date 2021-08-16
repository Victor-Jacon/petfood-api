/* Rotas API - 1 
Salva referência do nosso servidor express na variável express
Salva referência do módulo que cuida das rotas no server, na variavel Router
*/
const express = require('express');
const router = express.Router();

/* ROTA PETSHOPS 1 - Importe o model de petshop */
const Petshop = require('../models/petshop');

 /* ROTA PARCEIRO 3 - Importe o model de product*/
 const Product = require('../models/product');

 /* ROTA PURCHASE 1 - Importa o método de criar split transactions */
const createSplitTransaction = require('../services/pagarme').createSplitTransaction;

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

router.get('/petshops', async (req, res) => {
    try {
        const petshops = await Petshop.find();  /* ROTA PETSHOPS 2 - Usando o método find do mongoose retorne todos os petshops do banco de dados */
        res.json({error:false, petshops })
    } catch (err) {
        res.json({ error:true, message: err.message })
    }
})

 /* ROTA PARCEIRO 1 - Criei a rota que busca a página de um parceiro em específico, neste caso, ele passa como parâmetro o id, estes 2 pontos significa que o que vem a seguir é um parâmetro do req params. */
router.get('/petshop/:id', async (req, res) => {
    try {
        /* ROTA PARCEIRO 2 - Usando o método findById do mongoose retorne o parceiro que possui o id igual ao que foi passado na requisição como parâmetro */
        const petshop = await Petshop.findById(req.params.id);
        
         /* ROTA PARCEIRO 4 - Retorne todos os produtos que aquele parceiro vende.
         para retornar apenas de um parceiro específico, passamos um parâmetro no product find, que vai procurar por produtos que contenham nele o id do parceiro
         */
        let products = await Product.find({
            petshop_id: petshop._id
        });
        res.json({error:false, petshop: {...petshop._doc, products }})
    } catch (err) {
        res.json({ error:true, message: err.message })
    }
});

router.post('/purchase', async(req,res) => {
    try {
        const transaction = await createSplitTransaction(req.body);
        res.json(transaction) /* aqui não colocamos o error: false padrão pq ele já tá sendo feito dentro da rota de transaction */
    } catch (err) {
        res.json({ error:true, message: err.message })
    }
})


/* Rotas API - 2
Exporta o arquivo de rotas pra gente usar em outros lugares da nossa api
*/
module.exports = router;