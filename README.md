# DeployWithGulp
My Frontend Automation and Optimization Scripts for Deploys.

## Tasks

* Minificar css - cria o arquivo all.css
  
``` 
  npm run gulp build-css
```
* Minificar JS - cria o arquivo all.js
``` 
  npm run gulp build-js
```

* Otimizar imagens
``` 
  npm run gulp build-img
```
* Otimizar, minificar e uglyficar JS e CSS de acordo com o html
``` 
  npm run gulp usemin
```
* Marcação de Build

O Conteúdo 
```
    <!-- build:css css/index.min.css -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/landing-page.css" rel="stylesheet">
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <!-- endbuild -->
```
Será substituido pelo arquivo minificado 

```
    <link rel="stylesheet" href="css/index.min.css"/>
```


* Browser Sync - Server Localhost



# Deploy

Para realizar o deploy automatizado de todas as tasks acima:
Será criada uma pasta `dist`de Distribuição com o conteúdo tratado. 

```
  npm run gulp
```

# Criar servidores

Criar o servidor de Dev a partir da pasta de desenvolvimento `/src` 

```
  npm run gulp server-dev
```

Criar o servidor com as modificações e otimizações de produção a partir da pasta de distribuição `/dist`

```
  npm run gulp server-prod
```
