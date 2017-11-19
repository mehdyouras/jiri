import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import mongoose from 'mongoose'

import graphQLSchema from './Model/graphql/Schema'
import User from './Model/mongoose/user'
import Student from './Model/mongoose/student'
import Implementation from './Model/mongoose/implementation'
import nanoid from 'nanoid'

const PORT = 3000;

// Mongoose connect
mongoose.connect('mongodb://localhost:27017/jiri')

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

app.post('/addUser',(req,res)=>{

	var user = new User({
		id: nanoid(),
		is_admin : 1,
		name: 'Jean',
		email: 'Renard',
		password: 'test',
		company: 'HEPL',
	})

	user.save((err,result)=> {
		if (err) {console.log("---TodoItem save failed " + err)}
		console.log("+++TodoItem saved successfully ")

	})
	res.redirect('/')
})

app.post('/addStudent',(req,res)=>{

	var student = new Student({
		id: nanoid(),
		name: 'Jean',
		email: 'Renard',
	})

	student.save((err,result)=> {
		if (err) {console.log("---TodoItem save failed " + err)}
		console.log("+++TodoItem saved successfully ")

	})
	res.redirect('/')
})

app.post('/addImplementation',(req,res)=>{

	var implementation = new Implementation({
		id: nanoid(),
		project_id: 1,
		student_id: 1511107403394,
		url_project: "mehdy.ouras.be",
		url_repo: "github.com",
		event_id: 1,
	})
	implementation.save((err,result)=> {
		if (err) {console.log("---TodoItem save failed " + err)}
		console.log("+++TodoItem saved successfully ")

	})
	res.redirect('/')
})

app.listen(PORT);