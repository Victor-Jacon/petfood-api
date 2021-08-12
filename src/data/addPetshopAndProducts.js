/* Migrations 1 
Vamos importar tudo que vamos usar para fazer a inserção dos dados do json no nosso banco de dados
Vamos importar nossos models do DB
Vamos importar o db
*/

const Petshop = require('../models/petshop')
const Product = require('../models/product')
const petshops = require('./petfood.json') /* Migrations 2 A ideia é percorrer cada uma das linhas do meu json para inserir no meu banco de dados */
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
      const newPetshop = await new Petshop(petshop)
      .save();
      await Product.insertMany(
        petshop.produtos.map((p) =>
          ({ ...p, petshop_id: newPetshop._id }))
      );
    }
    console.log('Final do Script');
  } catch (err) {
    console.log(err.message)
  }
};

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