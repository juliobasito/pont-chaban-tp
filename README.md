# App client pour l'api du pont chaban

Le code actuel est un exemple et n'est pas forcément optimal, n'hésitez pas à refaire à votre sauce

## Installation

Assurez vous d'avoir l'api a jour ! Un petit `git pull` avant de commencer ne fait jamais de mal :)

```
git pull
npm install
npm start
```

## Librairies
- [`react-materialze`](https://react-materialize.github.io/#/) pour le style (vous pouvez en utiliser une autre si vous préférez)
- [`react-router-dom`](https://reacttraining.com/react-router/web/guides/philosophy) pour le routing
- [`moment`](https://momentjs.com/docs/) pour la manipulation des dates et des fonctions bien utiles (ex: `date.isAfter(date2)`)

## Fonctionnement de l'api

`[GET] /?from&to=from`: Renvoie la liste de toutes les dates de fermetures. On peut filter la liste des dates avec les paramètres `from`et `get` au format DD-MM-YY.

`[GET] /:id`: Renvoie un seul item si il existe

Status des reponses:  
- 200: La requete a reussi
- 400: La requete a échoué car les paramètres ne sont pas valides
- 404: La requete a échoué car les paramètres sont valides mais rien n'a été trouvé
- 500: Le serveur a rencontré une erreur

Dans le fichier `src/constant.js`, vous pouvez modifier la constante `CRASH_EVERY_X_CALLS` par un nombre,
de sorte que le serveur renvoie une erreur 500. __Attention, il ne reverra pas du JSON lors d'un crash !__
Pour cela, le serveur met un cookie sur votre navigateur pur compter le nombre d'appels. Assurez vous d'envoyer les cookies lors de vos appels
pour que cela fonctionne.

Pour une utilisation avec [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
```js
fetch(URL, {
  credentials: 'include',
})
.then(...)
```
## Structure de l'appli:
Voila la structure minimale de l'application. Vous pouvez faire plus de composants si vous voulez, mais pas moins !

```
<App>
|__ <HomePage>
|_____ <Search>
|_________ <SearchInput> // recherche le parametre from
|_________ <SearchInput> // recherche le parametre to
|_____ <List>
|_________ <ListItem>
|_________ <ListItem>
|_________ <ListItem> // chaque item doit contenir un lien vers la page Single associée
|_________ ...
|__ <Single>
|_____ <BackButton> // lien vers la homepage
|_____ <PrevButton> // lien vers la date précédente
|_____ <NextButton> // lient vers la date suivante
|_____ <Detail> // Informations sur la date de fermeture

```
On doit pouvoir arriver sur l'appli à n'importe quelle URL, donc la page single doit appeler la route d'api `/:id` et la page homepage la route `/`.
(En gros, ne pas injecter les données depuis la liste vers la page single)

## Features

La liste des features à implémenter, dans l'ordre. __Penser à faire un commit par feature__, de facon a pouvoir tout casser sans que ca soit le drame !

- Loading: Etat de chargement lors d'un appel à l'api
- Error: Afficher une boite d'alerte lorsque l'api renvoie une erreur (Dans un premier temps gérer tous les types d'erreur indifféremment de façon  a ce que l'appli ne crash pas.)
- Routing : depuis la liste vers page single
- Routing : Single vers homepage
- Error: Différencier les types d'erreurs pour afficher des erreurs plus utiles à l'utilisateur. (dates fournies invalides, erreur interne au serveur, ...)
- Search : pouvoir envoyer un paramètre `from` et / ou `to` pour filtrer la liste (pour l'exercice, on refait un appel a l'API, on ne filtre pas la liste en mémoire). __C'est la partie la plus difficile et la plus importante !__. A vous de voir quel composant doit faire les appels à l'API, qui gère les états de chargement, les erreurs, etc...
- Gérer le cas ou l'api ne renvoie pas de données. (Ce n'est pas une erreur, mais rien ne correspond aux dates fournies)
- Routing : Prev / next sur la single
- Error: Afficher une page 404 si une ID est invalide
- Search : gérer le cas ou on envoie des dates invalides, par exemple si `from` est postérieur à `to`. Il est possible que vous deviez casser ce que vous avez déjà fait jusque la. __Pensez à commit avant de vous lancer, ou changez de branche :)__
- Refactoring: Extraire les appels HTTP des composants dans un ficher/une classe à part
- ...

## API

ATTENTION
L'application est configuré pour avoir l'api lancé sur le port 1337.