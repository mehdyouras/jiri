# Jiri
## A GraphCool-powered backend coupled with VueJS
> Teacher's repo : https://github.com/hepl-pw/jiri/

| [Serverside (GraphCool)](https://github.com/mehdyouras/jiri/tree/master/Server) | [Clientside (VueJS + Apollo)](https://github.com/mehdyouras/jiri/tree/master/Client) | [Wireframe](https://github.com/mehdyouras/jiri/tree/master/design) |
|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------|--------------------------------------------------------------------|

You need to have Docker and Graphcool CLI installed

## Deploying graphcool server
```
gcf local up
cd Server
gcf deploy
cd ..
```

```
yarn install
yarn run vue
```

> Access Jiri via http://localhost:8080