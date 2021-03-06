import Vue from 'vue'

import { apolloClient } from './apollo';
import * as query from './constants/index.js'
import _ from 'lodash'
import {store} from './store'
import {router} from './router'
import gql from 'graphql-tag';

import {encrypt} from './crypto'

export const Bus = new Vue();

Bus.$on('authenticateUser', payload => {
    store.commit('isLoading')
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
            store.commit('isNotLoading');
            Bus.$emit('mutationSuccess', 'Vous vous êtes connecté avec succès.')
        },
    }).catch(e => {
        Bus.$emit('authenticateUserError', "L'adresse email ou le mot de passe est incorrect.")
        store.commit('isNotLoading')
    });
})

Bus.$on('removeItem', payload => {
    let {id, type} = payload;

    switch (type) {  
        case 'project' :
            apolloClient.mutate({
                mutation: query.DELETE_PROJECT,
                variables: {
                  id
                },
                update() {
                    Bus.$emit('mutationSuccess', 'Le projet a été supprimé avec succès.')
                },
                refetchQueries: [
                    {
                        query: query.ALL_PROJECTS,
                    }
                ]
            });
            break;
        case 'user' :
            apolloClient.mutate({
                mutation: query.DELETE_USER,
                variables: {
                  id
                },
                update() {
                    Bus.$emit('mutationSuccess', 'L\'utilisateur a été supprimé avec succès.')
                },
                refetchQueries: [
                    {
                        query: query.ALL_USERS,
                    }
                ]
            });
            break;
        case 'student' :
            apolloClient.mutate({
                mutation: query.DELETE_STUDENT,
                variables: {
                  id
                },
                update() {
                    Bus.$emit('mutationSuccess', 'L\'étudiant a été supprimé avec succès.')
                },
                refetchQueries: [
                    {
                        query: query.ALL_STUDENTS,
                    },
                    {
                        query: query.USER,
                        variables: {
                            id: store.state.currentUserId
                        },
                    },
                    {
                        query: query.STUDENTS_MET,
                        variables: {
                            id: store.state.currentUserId
                        },
                    }
                ]
            });
            break;
        case 'event' :
            apolloClient.mutate({
                mutation: query.DELETE_EVENT,
                variables: {
                  id
                },
                update() {
                    Bus.$emit('mutationSuccess', 'L\'événement a été supprimé avec succès.')
                },
                refetchQueries: [
                    {
                        query: query.USER,
                        variables: {
                            id: store.state.currentUserId
                        }
                    }
                ]
            });
            break;
    }
})

Bus.$on('createProject', payload => {
    let {name, description, weight} = payload;
    store.commit('isLoading')
    apolloClient.mutate({
        mutation: query.CREATE_PROJECT,
            variables: {
            name,
            description,
            weight
        },
        update() {
            store.commit('isNotLoading')
            Bus.$emit('mutationSuccess', 'Le projet a été créé avec succès.')
        },
        refetchQueries: [
            {
                query: query.ALL_PROJECTS,
            }
        ]
    }).catch(error => {
        store.commit('isNotLoading')
    });
})

Bus.$on('createStudent', payload => {
    let {email, name, nextStep} = payload;
    store.commit('isLoading')
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
            store.commit('isNotLoading')
            Bus.$emit('mutationSuccess', 'L\'étudiant a été créé avec succès.')
        },
        refetchQueries: [
            {
                query: query.ALL_STUDENTS,
            }
        ]
    }).catch(error => {
        store.commit('isNotLoading')
    });
})

Bus.$on('createUser', payload => {
    let {email, password, name, company, isAdmin} = payload;
    store.commit('isLoading')
    apolloClient.mutate({
        mutation: query.SIGNUP_USER,
            variables: {
                email,
                password,
                name,
                company,
                isAdmin
        },
        update() {
            store.commit('isNotLoading')
            Bus.$emit('userCreated')
            Bus.$emit('mutationSuccess', 'L\'utilisateur a été créé avec succès.')
        },
        refetchQueries: [
            {
                query: query.ALL_USERS,
            }
        ]
    }).catch(e => {
        store.commit('isNotLoading')
        Bus.$emit('createUserError', "L'adresse email est déjà utilisée.")
    });;
})

Bus.$on('createEvent', payload => {
    let {year, course, session, students, weights, users} = payload,
        currentUserId = store.getters.currentUserId;
        users.push(currentUserId)
    store.commit('isLoading')
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
            store.commit('isNotLoading')
            Bus.$emit('mutationSuccess', 'L\'événement a été créé avec succès.')
        },
    }).catch(error => {
        store.commit('isNotLoading')
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
        update() {
            // Bus.$emit('mutationSuccess', 'L\'implementation a été créé avec succès.')
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
    let {studentId, implementationId, comment, score, eventId} = payload,
        userId = store.getters.currentUserId;
    apolloClient.mutate({
        mutation: query.CREATE_SCORE,
            variables: {
                implementationId,
                studentId,
                userId,
                eventId,
                comment,
                score,
        },
        update() {
            Bus.$emit('mutationSuccess', 'Votre note a été enregstré avec succès.')
        },
        refetchQueries: [
            {
                query: query.STUDENT,
                variables: {
                    id: studentId,
                },
            },
            {
                query: query.STUDENTS_MET,
                variables: {
                    id: userId,
                },
            },
            {
                query: query.USER,
                variables: {
                    id: store.state.currentUserId,
                },
            },
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
        update() {
            Bus.$emit('mutationSuccess', 'La note a été modifié avec succès.')
        },
        refetchQueries: [
            {
                query: query.STUDENT,
                variables: {
                    id: studentId,
                },
            },
            {
                query: query.STUDENTS_MET,
                variables: {
                    id: store.getters.currentUserId,
                },
            },
        ]
    });
})

Bus.$on('updateImplementation', payload => {
    let {urlRepo, urlProject, studentId, id} = payload;
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

    apolloClient.mutate({
        mutation: query.UPDATE_USER,
            variables: {
                id,
                email,
                // password: hash,
                company,
                isAdmin
        },
        update() {
            Bus.$emit('mutationSuccess', 'L\'utilisateur a été modifié avec succès.')
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
        let hash = encrypt(password)
        apolloClient.mutate({
            mutation: query.UPDATE_USER_PASSWORD,
                variables: {
                    id,
                    password: hash,
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


        
    }
})

Bus.$on('updateEvent', payload => {
    let {year, course, session, students, weights, users, eventId} = payload,
        currentUserId = store.getters.currentUserId;
        store.commit('isLoading')
    apolloClient.mutate({
        mutation: query.UPDATE_EVENT,
            variables: {
                id: eventId,
                year,
                course,
                session,
                currentUserId,
                users,
                students,
                weights,
        },
        update() {
            store.commit('isNotLoading')
            Bus.$emit('mutationSuccess', 'L\'événement a été modifié avec succès.')
        },
        refetchQueries: [
            {
                query: query.EVENT,
                variables: {
                    id: eventId,
                },
            }
        ]
    }).catch(error => {
        store.commit('isNotLoading')
    });
})

Bus.$on('addStudentToEvent', payload => {
    let {eventId, studentId} = payload;

    apolloClient.mutate({
        mutation: query.ADD_STUDENT_TO_EVENT,
            variables: {
                studentId,
                eventId,
        },
        refetchQueries: [
            {
                query: query.STUDENT,
                variables: {
                    id: studentId,
                },
            },
            {
                query: query.EVENT,
                variables: {
                    id: eventId,
                },
            }
        ]
    });
})

Bus.$on('updateStudentName', payload => {
    let {studentId, name} = payload;

    apolloClient.mutate({
        mutation: query.UPDATE_STUDENT_NAME,
            variables: {
                id: studentId,
                name,
        },
        update() {
            Bus.$emit('mutationSuccess', 'Le nom de l\'étudiant a été modifié avec succès.')
        },
        refetchQueries: [
            {
                query: query.STUDENT,
                variables: {
                    id: studentId,
                },
            },
        ]
    });
})

Bus.$on('updateProject', payload => {
    let {id, weightId, weight, name, description} = payload;
    apolloClient.mutate({
        mutation: query.UPDATE_PROJECT,
            variables: {
                id,
                weightId,
                weight,
                name,
                description
        },
        update() {
            Bus.$emit('mutationSuccess', 'Le projet a été modifié avec succès.')
        },
        refetchQueries: [
            {
                query: query.ALL_PROJECTS,
            }
        ]
    });
})

Bus.$on('addManualScore', payload => {
    let {studentId, manualScore} = payload;
    store.commit('isLoading')

    apolloClient.mutate({
        mutation: query.ADD_MANUAL_SCORE,
            variables: {
                id: studentId,
                manualScore
        },
        update() {
            store.commit('isNotLoading')
            Bus.$emit('mutationSuccess', 'La note finale a été prise en compte.')
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

Bus.$on('addGlobalComment', payload => {
    let {id, studentId, userId, globalComment} = payload;
    store.commit('isLoading')

    apolloClient.mutate({
        mutation: query.ADD_GLOBAL_COMMENT,
            variables: {
                id,
                userId,
                studentId,
                globalComment
        },
        update() {
            store.commit('isNotLoading')
            Bus.$emit('mutationSuccess', 'Le commentaire global a été enregistré.')
        },
        refetchQueries: [
            {
                query: query.GLOBAL_COMMENT,
                variables: {
                    studentId,
                    userId,
                },
            }
        ]
    });
})