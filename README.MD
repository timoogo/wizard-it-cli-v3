# Wizard-it
__Wizard-it__ c'est une CLI qui permet de créer et gérer un backoffice en NextJS. 

## Les commandes 
- [ ] `wizard-it init` : Permet d'initialiser un projet NextJS avec le backoffice
  - settings.json: contient les informations de configuration du projet
    - name: Nom du projet
    - description: Description du projet
    - author: Auteur du projet
    - version: Version du projet
    - license: Licence du projet
    - repository: Lien du repository du projet
    - keywords: Mots clés du projet
    - theme: Thème du projet
    - language: Langue du projet
    - database: Base de données du projet
  - entity.definition.json: contient les informations nécéssaires pour chaque entité que le backoffice va gérer.
    - name: Nom de l'entité
    - tableName: Nom de la table dans la base de données
    - columns: Liste des colonnes de la table
      - name: Nom de la colonne
      - type: Type de la colonne
      - length: Longueur de la colonne
      - isPrimary: Si la colonne est une clé primaire
      - isGenerated: Si la colonne est générée
      - default: Valeur par défaut de la colonne
      - isUnique: Si la colonne est unique
      - nullable: Si la colonne est nullable
      
```json
{
  "entities": [
    {
      "name": "BewitchmentBase",
      "tableName": "bewitchment_bases",
      "columns": [
        {
          "name": "id",
          "type": "number",
          "length": "",
          "isPrimary": true,
          "isGenerated": true,
          "default": null,
          "isUnique": true,
          "nullable": false
        },
        {
          "name": "name",
          "type": "varchar",
          "length": null,
          "isPrimary": false,
          "isGenerated": false,
          "default": "",
          "isUnique": false,
          "nullable": false
        }
      ]
    }
    // Vous pouvez ajouter d'autres entités ici
  ],
  "version": x.x.x
}

```  
- [ ] `generate:entity` : Permet de générer une entité. La commande va demander une série de questions pour générer l'entité. tant que l'user n'a pas annoncé qu'il a fini de répondre aux questions, la commande va continuer à demander des questions. La CLI ne s'occupe que de créer un schéma agnostique. Une autre commande s'occupera de créer la DB. Voici la liste des questions:

  - Nom de l'entité
    - Si vide, on propose un nom aléatoire parmis une liste de noms 'magiques'. La liste est déjà crée
  - Nom de la table dans la base de données (snake_case) 
    - Doit être unique
    - Doit être en snake_case
    - Doit être en minuscule
    - Doit être en anglais
    - Doit être en singulier
    - Si l'user ne rentre rien, le nom de l'entité sera utilisé
    - Si le nom de la table existe déjà, on redemande le nom de la table
    - Si le nom de la table ne respecte pas les règles, on redemande le nom de la table
    - Si le nom de la table est valide, on passe à la question suivante
  - Nom de la colonne
    - Doit être unique
    - Doit être en snake_case si plusieurs mots
    - Doit être en minuscule
    - Doit être en anglais
    - Doit être en singulier
    - Si l'user ne rentre rien, on redemande le nom de la colonne
    - Si le nom de la colonne existe déjà, on redemande le nom de la colonne
    - Si le nom de la colonne ne respecte pas les règles, on redemande le nom de la colonne
    - Si le nom de la colonne est valide, on passe à la question suivante
  - Type de la colonne
    - Doit être un type valide (booléen, nombre, varchar, date, blob,  )
    - Si l'user ne rentre rien, on redemande le type de la colonne
    - Si le type de la colonne n'est pas valide, on redemande le type de la colonne
    - Si le type de la colonne est valide, on passe à la question suivante 
  -  Longueur de la colonne
    - Doit être un nombre
    - Si l'user ne rentre rien, on suppose que la longueur est ""
    - Si la longueur de la colonne n'est pas valide, on redemande la longueur de la colonne
    - Si la longueur de la colonne est valide, on passe à la question suivante
  - Contraintes
    - On demande si la colonne est une clé primaire
      - Si oui, on demande si la colonne est générée
        - Si oui, on demande si la colonne est unique
      - On demande si null est autorisé
    - Si la colonne n'est pas une clé primaire
      - On demande si la colonne est unique
      - On demande si null est autorisé
      - On demande si la colonne a une valeur par défaut
        - Si oui, on demande la valeur par défaut
        - Si non, on passe à la question suivante
  - On demande si l'user a fini de répondre aux questions
    - Si oui:
      -  on génère l'entité dans le fichier entity.definition.json sans écraser les entités déjà existantes
      -  On modifie le fichier entity.definition.json pour ajouter l'entité
         - Si l'entité existe déjà, on ne l'ajoute pas et on affiche un message d'erreur
         - Si l'entité n'existe pas: 
           - On incrémente la version du fichier entity.definition.json 
           - On crée un dossier `wizgen/migration/{timestamp}` qui contient deux fichier json: 
             - avant la migration: le fichier `old-migration` contient le fichier entity.definition.json avant la migration
             - après la migration: le fichier `new-migration` contient le fichier entity.definition.json après la migration
    - Si non, on recommence les questions


- [ ] `modify:entity` : Permet de modifier une entité. La commande va demander une série de questions pour modifier l'entité. tant que l'user n'a pas annoncé qu'il a fini de répondre aux questions, la commande va continuer à demander des questions. La CLI ne s'occupe que de créer un schéma agnostique. Une autre commande s'occupera de créer la DB.  Voici le déroulement de cette commande:
  - Si le fichier entity.definition.json n'existe pas, on propose de lancer la commande `wizard-it init`
    - Si l'user accepte, on lance la commande `wizard-it init`
      - On liste les entités déjà existantes dans le fichier entity.definition.json en demandant à l'user de choisir l'entité à modifier
      - On liste les colonnes déjà existantes dans l'entité en demandant à l'user de choisir la colonne à modifier
      - On pose la/les question(s) à l'user
      - on modifie:
        - le fichier entity.definition.json
        - on incrémente la version du fichier entity.definition.json
      - on crée: 
        - un dossier `wizgen/migration/{timestamp}` qui contient deux fichier json: 
          - avant la migration: le fichier `old-migration` contient le fichier entity.definition.json avant la migration
          - après la migration: le fichier `new-migration` contient le fichier entity.definition.json après la migration
  
    - Si l'user refuse, on affiche un message d'erreur et on quitte la commande
  


  ##
      A terme, je souhaite avoir une commande du genre wizard generate panel
    ça liste la liste des schemas
    on sélectionne celui qu'on veut
    et dans notre projet nextjs, dans :
    - src/page/:  il crée le dossier du nom de l'entitté avec les différents fichiers
    - src/api/  : il crée les endpoints de l'entité

    ## Exemple
    1. On génère une entité client
    ```bash
    wizard generate 
    ```
    ```bash
    $ wizard generate 
    # ...
    ? What is the entity name? client
    ? What is the column name? id
    ? What is the column type? number
    ? Is it a primary key? yes
    ? Is it a generated column? yes
    ? Is it a unique column? yes
    ? Is it a nullable column? no
    ? Do you want to add more columns? yes
    ? What is the column name? name
    ? What is the column type? string
    ? Is it a primary key? no
    ? Is it a generated column? no
    ? Is it a unique column? yes
    ? Is it a nullable column? no
    ? Do you want to add more columns? no
    ? Do you want to save the entity to a JSON file? yes
    Entity generated: dist/.wizgen/entity.definition.json

    ```
    2. On génère un panel # TODO

    ```bash
    wizard generate panel
    ```
    ```bash
    > For which entity do you want to generate a panel? 
    > client # On sélectionne l'entité client  
    > product

    > Are you sure you want to generate a panel for client? 
    > yes # On confirme la génération du panel pour l'entité client
    > no

    > What is the name of the panel? (client) # On peut modifier le nom du panel
    > clientPanel # Si on ne modifie pas le nom, le nom par défaut est client (le nom entre parenthèse)

    # il faut une commande en buller point pour sélectionner les différents types de panel
    > The panel has by default these pages, tick the ones you want to generate: 
    > list
    > create
    > update
    > delete
    > details
    > all # <-- On sélectionne cette option


    > What is the entry point of the panel? (/client) # On peut modifier le nom de l'entrée du panel
    > /client # On accepte le nom par défaut
    Summary:
    - Entity: client
    - Panel name: client
    - Panel entry point: /client

    > Do you want to modify something? (yes) # On peut modifier les informations du panel
    > yes
    > no #  <-- On sélectionne cette option 

    ```
    Dans le dossier `src/` on génère le dossier client/ avec les fichiers suivants :

    - `pages/client/index.tsx`: la page tabulaire qui liste les clients
    - `pages/client/create.tsx`: la page de création d'un client
    - `pages/client/update/[id].tsx`: la page de mise à jour d'un client
    - `pages/client/delete/[id].tsx`: la page de suppression d'un client
    - `pages/client/[id].tsx`: la page de détails d'un client

    Dans le dossier `src/api/` on génère :

    - le dossier `client/` qui contient les endpoints suivants :
    - `client/route.ts`: les routes de l'entité client 

    Dans le dossier `src/constants/` on append :
    - `api.routes.constants.ts`: la route vers le endpoint d'entré l'entité client 
    - "export const CLIENT_API_ROUTE = '`http://localhost:${PORT}/api/client`;"