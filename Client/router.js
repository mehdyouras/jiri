import VueRouter from 'vue-router'
import Vue from 'vue'

import LoginForm from './components/login/LoginForm.vue'
import Dashboard from './components/main/dashboard/Dashboard.vue'
import AddEvent from './components/main/event/AddEvent.vue'
import IndexEvents from './components/main/event/IndexEvents.vue'
import IndexStudents from './components/main/student/IndexStudents.vue'
import AddStudent from './components/main/student/AddStudent.vue'
import EditStudent from './components/main/student/EditStudent.vue'
import IndexUsers from './components/main/user/IndexUsers.vue'
import IndexProjects from './components/main/project/IndexProjects.vue'
import ChooseStudentForMeeting from './components/main/meeting/ChooseStudent.vue'
import IndexMeetings from './components/main/meeting/IndexMeetings.vue'
import ChooseImplementationsForMeeting from './components/main/meeting/ChooseImplementations.vue'
import AddImplementation from './components/main/implementation/AddImplementation.vue'
import ChooseStudentForImplementation from './components/main/implementation/ChooseStudent.vue'

import {store} from './store'
import {LOGGED_IN_USER} from './constants/loggedInUser.gql'
import {apolloClient} from './apollo'

Vue.use(VueRouter)

const routes = [
    {name: "login", path: "/", component: LoginForm},

    {name: "dashboard", path: "/dashboard", component: Dashboard},

    {name: "indexEvents", path: "/events", component: IndexEvents},
      {name: "addEvent", path: "/events/new", component: AddEvent},
      {name: "eventResults", path: "/events/results/:eventId", component: AddEvent},

    {name: "indexStudents", path: "/students", component: IndexStudents},
      {name: "addStudent", path: "/students/new", component: AddStudent},
      {name: "editStudent", path: "/students/:studentId", component: EditStudent},



    {name: "indexUsers", path: "/users", component: IndexUsers},

    {name: "indexProjects", path: "/projects", component: IndexProjects},

    {name: "indexMeetings", path: "/meetings", component: IndexMeetings},
      {name: "addMeeting", path: "/meetings/new", component: ChooseStudentForMeeting},
      {name: "addImplementationsToMeeting", path: "/meetings/:studentId", component: ChooseImplementationsForMeeting},

    {name: "addImplementation", path: "/implementation/", component: ChooseStudentForImplementation},
      {name: "addImplementationToStudent", path: "/implementation/:studentId", component: AddImplementation},

    {name: "indexImplementations", path: "/implementation/", component: ChooseStudentForImplementation},

    

      
    
]

export const router = new VueRouter({mode:'history',routes})


function loggedIn(data){
    return data.data.loggedInUser && data.data.loggedInUser.id !== ''
}

router.beforeEach((to, from, next) => {
    apolloClient.query({
        query: LOGGED_IN_USER,
        fetchPolicy: 'network-only',
      }).then(data => {  
        // if user IS NOT logged in and access a resource othen than login
        // goes back to login
        if(loggedIn(data) === null && to.name !== 'login'){
          next({name:'login'});

        // if user is logged in and access a resource other than login
        // stores currentUserId in store
        // and goes to the resource requested
        } else if (loggedIn(data) !== null) {
          store.commit('currentUserId', data.data.loggedInUser.id);
          next();

          // if user IS NOT logged in and access login
          // goes to the resrource
        } else {
            next();
        }

        // if user IS logged in but access login
        // goes back to dashboard
        if (loggedIn(data) !== null && to.name === 'login') {
          store.commit('currentUserId', data.data.loggedInUser.id);
          next({name:'dashboard'});
        }

        store.commit('appIsLoaded')

      }).catch(error => {
        console.error(error)
      });
})

export default router;