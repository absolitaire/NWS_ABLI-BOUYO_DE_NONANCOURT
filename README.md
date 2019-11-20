# nws_ABLI-BOUYO_DE_NONANCOURT

Etapes d'installation:

Cloner le repository
Avoir un service Mongodb lancé sur le port 27017
Se connecter sur la base de données avec Robo3T
Créer une base de données appelée "back"
Copier le contenu du fichier mongodb.init.js dans la console de Robo3t et éxecuter le script

Ouvrir un terminal dans le dossier /NWT_ABLI-BOUYO_DE_NONANCOURT/back-abli-bouyo-de-nonancourt
Lancer les commandes suivantes:

yarn global add @nestjs/cli
yarn install
yarn run start


Ouvrir un terminal dans le dossier /NWT_ABLI-BOUYO_DE_NONANCOURT/front-abli-bouyo-de-nonancourt
Lancer les commandes suivantes:

npm install -g npm@latest
npm install -g yarn
yarn global add @angular/cli

ng config --global cli.packageManager yarn
yarn install
ng serve

