# Front Desenvolvido em Vue.js 3

Projeto desenvolvido para o Desafio da empresa Growdev.


### Antes de iniciar

Antes de iniciar precisamos fazer algumas coisas antes, iremos rodar tudo localmente para melhor compreensão de como foi feito.


#### Passo 1:

Primeiramente clone este repositório em sua máquina e dê o seguinte comando:

`npm install`

Se der algum problema verifique sua versão do Node, eu sugiro usar no mínimo a versão 16.

## Rodando a aplicação

Após as instalações serem feitas iremos rodar o seguinte comando para iniciar a aplicação:

`npm run serve`

## Como foi feita ?

Para esse projeto foi usado:

    - Vue.js versão 3 + Typescript + Composition API;
    - Axios para conexão HTTP;
    - SweetAlert2 para informações e confirmações;
    - Praticamente foi usando a arquitetura MVC (model-view-controller);
    - Vuetify como framework css;
    - Nas classes CSS foi usado o padrão BEM;
    - Para as variáveis foi usado o padrão camelCase;
    - Jest para testes.

### O que podemos melhorar ?

Visando as melhorias do sistema, poderiar melhorar algumas coisas que com tempo maior poderiam ser feitas, como:
    - Melhorar o design, deixando cores combinando;
    - Incluir gerenciamento de estado, talvez utilizando Vuex ou Pinia;
    - Máscaras nos campos de texto, ex: CPF ###.###.###-##
    - Colocaria mais testes, e para cada branch verificaria através da entrega contínua;
    - Configurar uma .env para deixar os dados de conexao com a API, API-keys, entre outros;
    - Acessibilidade do sistema;
    - Com mais tempo incluiria o i18n para tradução da aplicação, podendo alterar entre en-US/pt-BR.

Tem muitas coisas que poderiam ser feitas, com tempo maior de análises, verificando todos os requisitos, vendo os pacotes que são pesados para usá-los de outras formas e ter melhores perfomances.

Todo esse projeto foi feito em pouco tempo mas com muito carinho <3.
