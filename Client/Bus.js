import Vue from 'vue'

import { apolloClient } from './apollo';
import * as query from './constants/index.js'
import _ from 'lodash'
import {store} from './store'
import {router} from './router'
import gql from 'graphql-tag';

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
            update: (cache, {data: {deleteProject}}) => {
                const data = cache.readQuery({ query: query.ALL_PROJECTS })
                _.remove(data.allProjects, (item) => {
                    return item.id === deleteProject.id
                })
                cache.writeQuery({ query: query.ALL_PROJECTS, data })
            }
          });
    } else if (type === 'user') {
        apolloClient.mutate({
            mutation: query.DELETE_USER,
            variables: {
              id
            },
            update: (cache, {data: {deleteUser}}) => {
                const data = cache.readQuery({ query: query.ALL_USERS })
                _.remove(data.allUsers, (item) => {
                    return item.id === deleteUser.id
                })
                cache.writeQuery({ query: query.ALL_USERS, data })
            }
          });
    } else if (type === 'student') {
        apolloClient.mutate({
            mutation: query.DELETE_STUDENT,
            variables: {
              id
            },
            update: (cache, {data: {deleteStudent}}) => {
                const data = cache.readQuery({ query: query.ALL_STUDENTS })
                _.remove(data.allStudents, (item) => {
                    return item.id === deleteStudent.id
                })
                cache.writeQuery({ query: query.ALL_STUDENTS, data })
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
        update: (cache, {data: {createProject}}) => {
            apolloClient.resetStore()
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
        update: (cache, {data: {createStudent}}) => {
            apolloClient.resetStore()
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
        update: (cache, {data: {signupUser}}) => {
            apolloClient.resetStore()
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
        update: (cache, {data: {createImplementation}}) => {
            apolloClient.resetStore()
        },
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
        update: (cache, {data: {updateImplementation}}) => {
            apolloClient.resetStore()
        },
    });
})

Bus.$on('updateScore', payload => {
    let {id, score, comment} = payload;
    apolloClient.mutate({
        mutation: query.UPDATE_SCORE,
            variables: {
                id,
                score,
                comment
        },
        update: (cache, {data: {updateScore}}) => {
            apolloClient.resetStore();
        },
    });
})