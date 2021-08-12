const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
  /* RELACIONAMENTO DB 
  A gente vai ter diversos produtos, mas precisamos saber: De que petshop este produto é?
  Quem está vendendo este produto?
  Pra resolver esta questão faremos o seguinte..
  Aqui em petshop_id eu crio como se fosse a chave estrangeira do sql
  A gente declara que o tipo de dado dele será um id de objeto, e que ele faz referência ao model petshop, que foi o nome que demos na hora de exportar o módulo dele, na ultima linha do arquivo
  */
  petshop_id: {
    type: Schema.Types.ObjectId,
    ref: 'Petshop',
  },
  nome: String,
  capa: String,
  preco: Number,
  avaliacoes: Number
});

module.exports = mongoose.model('Product', product);