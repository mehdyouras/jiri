import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import mongoose from 'mongoose'

import graphQLSchema from './graphql/Schema/Schema'
import User from './mongoose/user'

const PORT = 3000;

// Mongoose connect
mongoose.connect('mongodb://localhost:27017/local')

var db = mongoose.connection;
db.on('error', ()=> {console.log( '---FAILED to connect to mongoose')})
db.once('open', () => {
	console.log( '+++Connected to mongoose')
})

const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: graphQLSchema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.get('/',(req,res)=>{
	res.sendFile(__dirname + '/index.html')
})

app.post('/quotes',(req,res)=>{
	// Insert into TodoList Collection
	var user = new User({
		is_admin : 1,
		name: 'Jean',
		email: 'Renard',
		password: 'test',
		company: 'HEPL',
	})

	user.save((err,result)=> {
		if (err) {console.log("---TodoItem save failed " + err)}
		console.log("+++TodoItem saved successfully "+user.name)

		res.redirect('/')
	})
})

app.listen(PORT);