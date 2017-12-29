import Vue from 'vue'

import { apolloClient } from './apollo';
import * as query from './constants/index.js'
import _ from 'lodash'
import {store} from './store'
import {router} from './router'
import gql from 'graphql-tag';

import bcrypt from 'bcryptjs'

export const Bus = new Vue();

Bus.$on('authenticateUser', payload => {
    store.commit('isLoggingIn')
    let {email, password} = payload;
    apolloClient.mutate({
        mutation: query.AUTHENTICATE_USER,
            variables: {
                email,
                password
        },

        update: (cache, {data: {authenticateUser}}) => {
            localStorage.setItem('userToken', authenticateUser.token);
            router.push({name:'dashboard'});
            store.commit('isNotLoggingIn')
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
            refetchQueries: [
                {
                    query: query.ALL_PROJECTS,
                }
            ]
          });
    } else if (type === 'user') {
        apolloClient.mutate({
            mutation: query.DELETE_USER,
            variables: {
              id
            },
            refetchQueries: [
                {
                    query: query.ALL_USERS,
                }
            ]
          });
    } else if (type === 'student') {
        apolloClient.mutate({
            mutation: query.DELETE_STUDENT,
            variables: {
              id
            },
            refetchQueries: [
                {
                    query: query.ALL_STUDENTS,
                }
            ]
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
        refetchQueries: [
            {
                query: query.ALL_PROJECTS,
            }
        ]
    });
})

Bus.$on('createStudent', payload => {
    let {email, name, nextStep} = payload;

    apolloClient.mutate({
        mutation: query.CREATE_STUDENT,
            variables: {
                email,
                name,
        },
        update: (cache, {data: {createStudent} }) => {
            store.commit('lastAddedId', createStudent.id)
            if(nextStep) {
                router.push({name: 'editStudent', params: {studentId: createStudent.id}})
            }
        },
        refetchQueries: [
            {
                query: query.ALL_STUDENTS,
            }
        ]
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
        refetchQueries: [
            {
                query: query.ALL_USERS,
            }
        ]
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
        update: (cache, {data: {createEvent}}) => {
            const data = cache.readQuery({ query: query.USER, variables: {id: currentUserId} })
            data.User.events.push(createEvent)
            cache.writeQuery({ query: query.USER, data })
        },
    });
})

Bus.$on('createImplementation', payload => {
    let {urlRepo, urlProject, projectId, studentId} = payload;
    apolloClient.mutate({
        mutation: query.CREATE_IMPLEMENTATION,
            variables: {
                urlRepo,
                urlProject,
                projectId,
                studentId
        },
        refetchQueries: [
            {
                query: query.STUDENT,
                variables: {
                    id: studentId,
                },
            }
        ]
    });
})

Bus.$on('createScore', payload => {
    let {studentId, implementationId, comment, score} = payload,
        userId = store.getters.currentUserId;
    apolloClient.mutate({
        mutation: query.CREATE_SCORE,
            variables: {
                implementationId,
                studentId,
                userId,
                comment,
                score,
        },
        refetchQueries: [
            {
                query: query.STUDENT,
                variables: {
                    id: studentId,
                },
            }
        ]
    });
})

Bus.$on('updateScore', payload => {
    let {id, score, comment, studentId} = payload;
    apolloClient.mutate({
        mutation: query.UPDATE_SCORE,
            variables: {
                id,
                score,
                comment
        },
        refetchQueries: [
            {
                query: query.STUDENT,
                variables: {
                    id: studentId,
                },
            }
        ]
    });
})

Bus.$on('updateImplementation', payload => {
    let {urlRepo, urlProject, id} = payload;
    apolloClient.mutate({
        mutation: query.UPDATE_IMPLEMENTATION,
            variables: {
                id,
                urlRepo,
                urlProject,
        },
        refetchQueries: [
            {
                query: query.STUDENT,
                variables: {
                    id: studentId,
                },
            }
        ]
    });
})

Bus.$on('updateUser', payload => {
    let {id, email, password, company, isAdmin} = payload;

    console.log(password)

    apolloClient.mutate({
        mutation: query.UPDATE_USER,
            variables: {
                id,
                email,
                // password: hash,
                company,
                isAdmin
        },
        refetchQueries: [
            {
                query: query.USER,
                variables: {
                    id,
                },
            }
        ]
    });
    if(password !== "") {
        const salt = bcrypt.genSaltSync(10)
        bcrypt.hash(password, salt).then(data => {
            apolloClient.mutate({
                mutation: query.UPDATE_USER_PASSWORD,
                    variables: {
                        id,
                        password: data,
                },
                refetchQueries: [
                    {
                        query: query.USER,
                        variables: {
                            id,
                        },
                    }
                ]
            });
        })


        
    }
})