/* Migrations 1 
Vamos importar tudo que vamos usar para fazer a inserção dos dados do json no nosso banco de dados
Vamos importar nossos models do DB
Vamos importar o db
*/

const Petshop = require('../models/petshop')
const Product = require('../models/product')
const petshops = require('./petfood.json') /* Migrations 2 A ideia é percorrer cada uma das linhas do meu json para inserir no meu banco de dados */

/* API PAGAR ME 6 - Importo a integração de api de terceiros que fiz com o pagar me dentro da variável create recipients. 
No final da linha eu coloquei .createRecipient, pq eu quero exportar a função create recipient que está dentro do arquivo pagarme.js */
const createRecipients = require('../services/pagarme').createRecipient;


require('../database')


/* Migrations 3 
Vamos criar uma função pra percorrer o json e adicionar no DB
Pra cada petshop vou percorrer e adicionar na variavel petshop (for)
Crio a variável newPetshop, essa variável vai herdar a configuração de classe do model Petshop que criamos.
Ela vai receber como parâmetro os dados do petshop da vez (está iterando os petshops, e cada petshop tem o nome de petshop)
Depois de configurarmos que newPetshop será uma classe de model que criamos, vamos SALVAR isso no banco de dados (save)
Vamos aguardar salvar, e depois disso, vamos acessar o model product, e vamos inserir muitos produtos
Cada produto vai ser mapeado com o nome p, vamos salvar tudo que vier do p, e tb, vamos salvar o ID do petshop que está vendendo aquele produto, pra sabermos de quem é o produto
No campo petshop_id vai ser salvo o id que tiver dentro da variavel newPetshop, que é o nosso model de petshop
*/
const addPetshopsAndProducts = async () => {
  try {
    for (let petshop of petshops) {

      /* API PAGAR ME 7 
      Aqui vamos aguardar a requisição criar um novo recipient, passamos como parâmetro o nome do petshop, que é o que a nossa api espera lá no pagarme.js para enviar junto na requisição, ele pega de forma dinamica este nome, e manda pra lá, igual fazemos em um campo input. */
      const recipient = await createRecipients(petshop.nome);

      /* API PAGAR ME 8 - O status da requisição, pra saber se deu certo, vai estar salvo na variável recipient. SE não conter nela "erro" significa que deu certo. 
      Então a gente vai colocar um IF que , se der tudo certo com o await acima, ai sim ele executa o bloco de código abaixo.
      Se der tudo certo, vamos salvar tudo que vier do petshop (...petshop), 
      No campo recipient_id deste model que está sendo criado, vamos colocar o valor que estiver na variavel recipient (recipient.data), e a gente seleciona que vamos querer o valor id (recipient.data.id)
      */
      if (!recipient.error) {
        const newPetshop = await new Petshop({ 
          ...petshop, 
          recipient_id: recipient.data.id,
        })
        .save();

        await Product.insertMany(
          petshop.produtos.map((p) =>
            ({ ...p, petshop_id: newPetshop._id }))
        );
      } else {
        console.log(recipient.message) /* API PAGAR ME 9 - Se não der certo a criação de um novo recipient, ai mostra pra gente a mensagem de erro que deu. */
      }
    }
    console.log('Final do Script');
  } catch (err) {
    console.log(err.message)
  }
};

/* API PAGAR ME 9 
Antes da gente executar o script que vai adicionar os dados do petfood.json + dados do recipient id do pagarme, a gente precisa dropar o database lá no mongoDB Compass.
Então a gente vai na linha do banco de dados, e clica no lixinho, e dropa o banco de dados
Assim os novos registros serão criados com o recipient_id
*/

/* Migrations 4 
Aqui vamos colocar a execução da nossa função, pra que no próximo passo, o node seja capaz de executar o script.
*/
addPetshopsAndProducts();

/* Migrations 5
Com o script de migrations completo, agora a gente precisa startar ele.

Pra isso, acessa a pasta api/src/data (pra gente ter acesso a este arquivo aqui)
E roda o comando: node addPetshopsAndProducts.js
Este addPetshops.. é o nome da função que a gente criou no nosso script de migrations. 
*/

/* Migrations 6 (passo 6 está incompleto)
A gente rodou este script, ele criou pra gente o banco de dados lá no mongoDB
Mas o problema é que deste jeito ele não cria o recipient_id que a gente usa pra dizer ao pagarme pra quem eles precisam depositar as comissões de parceiros
Então a gente precisa apagar o banco de dados inteiro lá no mongoDB compass.
@@restante da configuração irei colocar aqui.
*/