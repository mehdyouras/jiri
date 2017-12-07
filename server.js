const express = require('express')
import playground from 'graphql-playground-middleware-express'

const app = express()


// Connection to remote GraphQL
app.use(function (req, res, next) {
  
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:60000/simple/v1/cjawxygal00020121ulquzy7m');
  
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
  
      // Pass to next layer of middleware
      next();
  });


// 
app.use('/playground', playground({ endpoint: 'http://localhost:60000/simple/v1/cjawxygal00020121ulquzy7m' }))

app.listen(3000, () => console.log('Server running. Open http://localhost:3000/playground to run queries.'))