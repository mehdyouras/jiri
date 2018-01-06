import VueRouter from 'vue-router'
import Vue from 'vue'

import LoginForm from './components/login/LoginForm.vue'
import Dashboard from './components/main/dashboard/Dashboard.vue'
import AddEvent from './components/main/event/AddEvent.vue'
import IndexEvents from './components/main/event/IndexEvents.vue'
import EditEvent from './components/main/event/EditEvent.vue'
import IndexStudents from './components/main/student/IndexStudents.vue'
import AddStudent from './components/main/student/AddStudent.vue'
import IndexUsers from './components/main/user/IndexUsers.vue'
import AddUser from './components/main/user/AddUser.vue'
import IndexProjects from './components/main/project/IndexProjects.vue'
import AddProject from './components/main/project/AddProject.vue'
import ChooseStudentForMeeting from './components/main/meeting/ChooseStudent.vue'
import IndexMeetings from './components/main/meeting/IndexMeetings.vue'
import ChooseImplementationsForMeeting from './components/main/meeting/ChooseImplementations.vue'
import ChooseStudentForImplementation from './components/main/implementation/ChooseStudent.vue'

import {store} from './store'
import {LOGGED_IN_USER} from './constants/loggedInUser.gql'
import {apolloClient} from './apollo'

Vue.use(VueRouter)

const routes = [
    {name: "login", path: "/", component: LoginForm, meta: {adminRoute: false}},

    {name: "dashboard", path: "/dashboard", component: Dashboard, meta: {adminRoute: false}},

    {name: "indexEvents", path: "/events", component: IndexEvents, meta: {adminRoute: true}},
      {name: "addEvent", path: "/events/new", component: AddEvent, meta: {adminRoute: true}},
      {name: "eventResults", path: "/events/results/:eventId", component: AddEvent, meta: {adminRoute: true}},
      {name: "editEvent", path: "/events/:eventId", component: EditEvent, meta: {adminRoute: true}},

    {name: "indexStudents", path: "/students", component: IndexStudents, meta: {adminRoute: false}},
      {name: "addStudent", path: "/students/new", component: AddStudent, meta: {adminRoute: true}},

    {name: "indexUsers", path: "/users", component: IndexUsers, meta: {adminRoute: true}},
      {name: "addUser", path: "/users/new", component: AddUser, meta: {adminRoute: true}},

    {name: "indexProjects", path: "/projects", component: IndexProjects, meta: {adminRoute: true}},
      {name: "addProject", path: "/projects/new", component: AddProject, meta: {adminRoute: true}},

    {name: "indexMeetings", path: "/meetings", component: IndexMeetings, meta: {adminRoute: false}},
      {name: "addMeeting", path: "/meetings/new", component: ChooseStudentForMeeting, meta: {adminRoute: false}},
      {name: "addImplementationsToMeeting", path: "/meetings/:studentId", component: ChooseImplementationsForMeeting, meta: {adminRoute: false}},

    {name: "indexImplementations", path: "/implementations/", component: ChooseStudentForImplementation, meta: {adminRoute: true}},

    

      
    
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
        if(to.meta.adminRoute === true && data.data.loggedInUser.isAdmin === false) {
          next({name: 'dashboard'})
          return;
        }
        // if user IS NOT logged in and access a resource othen than login
        // goes back to login
        if(loggedIn(data) === null && to.name !== 'login'){
          next({name:'login'});

        // if user is logged in and access a resource other than login
        // stores currentUserId in store
        // and goes to the resource requested
        } else if (loggedIn(data) !== null) {
          if (to.name === 'login') {
            // if user IS logged in but access login
            // goes back to dashboard
            store.commit('setBasicDetails', {id : data.data.loggedInUser.id, isAdmin: data.data.loggedInUser.isAdmin})
            next({name:'dashboard'});
          }
          store.commit('setBasicDetails', {id : data.data.loggedInUser.id, isAdmin: data.data.loggedInUser.isAdmin})
          next();

          // if user IS NOT logged in and access login
          // goes to the resrource
        } else {
            next();
        }

        store.commit('appIsLoaded')

      }).catch(error => {
        console.error(error)
      });
})

export default router;