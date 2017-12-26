import {Bus} from '../Bus'
import { apolloClient } from '../apollo';
import * as query from '../constants/index.js'
import _ from 'lodash'
import {store} from './store'
import {router} from './router'

Bus.$on('authenticateUser', payload => {
    let {email, password} = payload;

    apolloClient.mutate({
        mutation: query.AUTHENTICATE_USER,
            variables: {
                email,
                password
        },
        update: (store, {data: {authenticateUser}}) => {
            localStorage.setItem('userToken', authenticateUser.token); 
            router.push({name:'dashboard'});
        },
    });
})

Bus.$on('removeItem', payload => {
    let {id, type} = payload;

    if(type === 'project') {
        apolloClient.mutate({
            mutation: query.DELETE_PROJECT,
            variables: {
              id
            },
            update: (store, {data: {deleteProject}}) => {
                const data = store.readQuery({ query: query.ALL_PROJECTS })
                _.remove(data.allProjects, (item) => {
                    return item.id === deleteProject.id
                })
                store.writeQuery({ query: query.ALL_PROJECTS, data })
            }
          });
    } else if (type === 'user') {
        apolloClient.mutate({
            mutation: query.DELETE_USER,
            variables: {
              id
            },
            update: (store, {data: {deleteUser}}) => {
                const data = store.readQuery({ query: query.ALL_USERS })
                _.remove(data.allUsers, (item) => {
                    return item.id === deleteUser.id
                })
                store.writeQuery({ query: query.ALL_USERS, data })
            }
          });
    } else if (type === 'student') {
        apolloClient.mutate({
            mutation: query.DELETE_STUDENT,
            variables: {
              id
            },
            update: (store, {data: {deleteStudent}}) => {
                const data = store.readQuery({ query: query.ALL_STUDENTS })
                _.remove(data.allStudents, (item) => {
                    return item.id === deleteStudent.id
                })
                store.writeQuery({ query: query.ALL_STUDENTS, data })
            }
          });
    }

})

Bus.$on('createProject', payload => {
    let {name, description, weight} = payload;

    apolloClient.mutate({
        mutation: query.CREATE_PROJECT,
            variables: {
            name,
            description,
            weight
        },
        update: (store, {data: {createProject}}) => {
            const data = store.readQuery({ query: query.ALL_PROJECTS })
            data.allProjects.push(createProject)
            store.writeQuery({ query: query.ALL_PROJECTS, data })
        },
    });
})

Bus.$on('createStudent', payload => {
    let {email, name} = payload;

    apolloClient.mutate({
        mutation: query.CREATE_STUDENT,
            variables: {
                email,
                name,
        },
        update: (store, {data: {createStudent}}) => {
            const data = store.readQuery({ query: query.ALL_STUDENTS })
            data.allStudents.push(createStudent)
            store.writeQuery({ query: query.ALL_STUDENTS, data })
        },
    });
})

Bus.$on('createUser', payload => {
    let {email, password, name, company, isAdmin} = payload;

    apolloClient.mutate({
        mutation: query.SIGNUP_USER,
            variables: {
                email,
                password,
                name,
                company,
                isAdmin
        },
        update: (store, {data: {signupUser}}) => {
            const data = store.readQuery({ query: query.ALL_USERS })
            signupUser.meetings = [];
            signupUser.events = [];
            console.log(signupUser)
            data.allUsers.push(signupUser)
            store.writeQuery({ query: query.ALL_USERS, data })
        },
    });
})

Bus.$on('createEvent', payload => {
    let {year, course, session, students, weights, users} = payload,
        currentUserId = store.getters.currentUserId;

    apolloClient.mutate({
        mutation: query.CREATE_EVENT,
            variables: {
                year,
                course,
                session,
                currentUserId,
                users,
                students,
                weights,
        },
        update: (store, {data: {createEvent}}) => {
            const data = store.readQuery({ query: query.USER, variables: {id: currentUserId} })
            data.User.events.push(createEvent)
            store.writeQuery({ query: query.USER, data })
        },
    });
})