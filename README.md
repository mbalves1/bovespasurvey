
Test for front-end.

A aplicação foi desenvolvida em Vue utilizando o Quasar. Algumas libs foram incluídas para animações como tilt e chartjs.

O projeto desenvolvido contém uma tela inicial de login, onde conseguimos também criar uma conta e logar
Foi incluida uma verificação para que o usuário não consiga avançar pela url. Assim que o login é feito é salvo no localstorage algumas informações que são
usadas para manter o user logado e deslogar (após 50000).

Para o formulário foi utilizada a validação nativa do quasar.

Após o login o usuário consegue ver em um carosel as cotações de crypto e cambios principais

Em todos campos onde mostramos os valores, nomes e icones foram adicionadas as cores correspondentes, verde caso o valor esteja > 0 e vermelho para < 0.

A aplicação foi hospedada no vercel e conseguimos visualizar no https://bovsurvey.vercel.app/#/

Utilizamos também a Vuex para gerenciamento de estado.

O projeto utiliza a api
https://hgbrasil.com/status/finance/


## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
yarn quasar dev
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
