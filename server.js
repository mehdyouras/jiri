import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import mongoose from 'mongoose'

import graphQLSchema from './graphql/Schema/Schema'
import User from './mongoose/user'
import Student from './mongoose/student'
import Implementation from './mongoose/implementation'

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

app.post('/addUser',(req,res)=>{
	// Insert into Jiri Collection
	var user = new User({
		id: parseInt(Date.now()),
		type: 'user',
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
	// Insert into Jiri Collection
	var student = new Student({
		id: parseInt(Date.now()),
		type: 'student',
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
		id: Date.now(),
		project_id: 1,
		student_id: 1511107403394,
		type: 'implementation',
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