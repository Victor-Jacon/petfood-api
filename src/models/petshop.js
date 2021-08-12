/* DB 1 
O schema é a estrutura do model, o model é basicamente a tabela que a gente vai guardar os dados. Quais são os campos, como os campos vão se comportar. */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* DB 2 
O Schema do NoSQL é basicamente a TABLE do SQL, então aqui estamos definindo*/
const petshop = new Schema({
  nome: String,
  logo: String,
  categoria: String,
  destaque: Number,
  location: Object,
  recipient_id: String /* É o id do recebedor, do nosso parceiro, que usaremos no split de pgto para que o pagarme saiba para quem eles tem que depositar o dinheiro. */
})

/* 
O location é objeto que usaremos no nosso marker pra latitude e longitude, pra marcar no mapa onde fica o petshop do nosso parceiro.

A gente poderia colocar assim tb:
  location: {
    lat: String,
    lng: String
  }

Mas dando o tipo object, tb permite que a gente salve os dados normal tb, são duas formas de fazer o model neste caso. 
*/

/* DB 3 - Exportamos para podermos usar este model em outros lugares da nossa aplicação */
module.exports = mongoose.model('Petshop', petshop);