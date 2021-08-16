/* .ENV 1 - 
yarn add dotenv - Instalei o .env para controlar a segurança das minhas chaves api
!!!! Quando for dar deploy a gente não vai usar mais o .env, pq essas chaves api vão ficar no ambiente da hospedagem, no ambiente da vercel/amazon etc. !!!
Com o require, eu importo o dotenv pra eu poder acessar os dados do arquivo .env
!!! A gente adiciona um bloco de checagem, só pra ver se ele está em produção, isso garante que a gente não suba as chaves secretas para produção sem querer. !!! 
Neste projeto não deu pra usar .env, não consegui fazer funcionar, ai apelei para o .json e excluindo ele do git
*/ 
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

/* API PAGAR ME - 1
Criar a pasta services + arquivo pagarme.js
Instalar o axios - yarn add axios (dá pra fazer requisições de um backend/api para outro backend/api)
Importar o axios
*/

const axios = require('axios');

/* API PAGAR ME - 2
Colocar no baseURL a url que a documentação diz que receberá os posts de recipients, estamos usando essa url porque vamos testar o cadastro de recebedores, ou seja, parceiros que vão receber valores por conta das vendas realizadas no nosso marketplace.
Bug: Precisa tomar muito cuidado na hora de copiar a url, pq la na documentação vai até o final com recipients, e na pratica, vamos usar conforme descrito abaixo
*/
const api = axios.create({
  baseURL: 'https://api.pagar.me/1',
});

/* API PAGAR ME - 3 
Criamos o arquivo keys.json para armazenar nossa api de teste
O ideal é usar um arquivo .env, que é o jeito seguro de salvar chaves apis, fizemos assim só pra ser mais rápido mesmo, em produção não pode ser feito assim.
*/

/* API PAGAR ME 4
Importamos a api key criada em keys.json, que é a chave api de teste do nosso ambiente sandbox do pagarme
*/
const api_key = require('../keys.json').api_key;

/* API PAGAR ME 5
Criamos um método para nosso backend, e este cara aqui que vai fazer o processo de requisição ficar dinâmico.
E nos campos que eu mandei com dados estáticos, eu substituo por variáveis do meu projeto.
Este é o modelo padrão de uma requisição, é um método async, as variáveis que a gente for usar neste método a gente passa dentro do parentesis, neste caso só colocamos name mesmo, o resto será estático, pois a ideia é só realizar testes.
Aí eu crio a variável response, essa variável vai armazenar qual foi a resposta que a api de terceiros deu pra gente.
Neste caso a gente vai colocar dentro de um try para termos tratamento de erros para caso a requisição não dê certo
A gente usa o objeto api, que a gente configurou com o axios, e quando for realizado um post na rota recipients, a gente envia o seguinte código cURL, que é o post bruto mesmo, poderia ser no formato JS, mas a gente tá usando o cURL, que é o mesmo que usamos no insomnia.

*/
module.exports = {
  createRecipient: async (name) => {
    try {

      const response = await api.post('/recipients', {	
        "anticipatable_volume_percentage": "85", 
            "api_key": api_key, 
            "automatic_anticipation_enabled": "true", 
            "bank_account": {
                    "bank_code": "341",
                "agencia": "0932",
                "agencia_dv": "5",
                "conta": "58054",
                "type": "conta_corrente",
                "conta_dv": "1",
                "document_number": "26268738888",
                "legal_name": name
            }, 
            "register_information": {
              "type": "corporation",
              "document_number": "26268738888",
              "company_name": name,
              "email": "some@email.com",
              "site_url":"http://www.site.com",
              "phone_numbers":  [
                {
                  "ddd": "11",
                  "number": "987654321",
                  "type": "mobile"
                }
              ]
            },
            "transfer_day": "5", 
            "transfer_enabled": "true", 
            "transfer_interval": "weekly",
            "postback_url": "https://requestb.in/tl0092tl"
        })

        return { error: false, data: response.data}

    } catch (err) {
      return { error: true, message: err.message };
    }
  },
  /* SPLIT 1 - 
  1º - Copiamos e testamos no insomnia o cURL da documentação do pagarme:https://docs.pagar.me/docs/split-rules
  2º - configuramos a rota certa conforme a documentação, que é /transactions
  3º - Nós vamos "postar" para a rota /transactions, nossa api_key + tudo que vier de data.
  4º - E depois, configuramos o return dentro do try (quando dá certo) que vai retornar para nós os dados de resposta que a api do pagarme responder pra gente, e vai dizer que não deu erro, afinal, se o try deu certo, significa que deu status code 200.
  5º - Dentro do catch, colocamos o que retornar caso dê erro, neste caso vai retornar a mensagem de erro, e dizer que ocorreu um erro.
  */
  createSplitTransaction: async () => {
    try {
      const response = await api.post('/transactions', {
        api_key,
        ...data
      });

      return { error:false, data:response.data }
    } catch (err) {
      return { error: true, message: err.message }
    }
  }
}

/* Insomnia Requisição 1 
-Quando a gente está criando essas requisições para nosso projeto como fizemos aqui, a gente tb pode exportar ou importar de um arquivo json criado no insomnia de outro pc.
-Por ex, vamos supor este projeto aqui que eu desenvolvi, se eu quiser, eu posso pegar as requisições que eu criei lá no insomnia, exportar elas, elas vão ficar salvas em um arquivo .json, e aí, eu posso enviar esse arquivo para um colega por ex, e ele já pega tudo pronto para realizar os testes que ele quiser.
-O passo a passo em mais detalhes está no baralho do anki.

*/