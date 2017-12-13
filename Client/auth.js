// import {apolloClient} from './apollo'
// import gql from 'graphql-tag'

// apolloClient.query(
//     {
//     query: gql`{
//         loggedInUser{
//             id
//         }
//         }`
//     }
// ).then((data) => {
//     const isUserLoggedIn = false;
//     if(data.data.loggedInUser === null){
//         const isUserLoggedIn = false;
//     }else{
//         console.log(data)
//         const isUserLoggedIn = data.data.loggedInUser;
//     }
// }).catch((e) => {
//     console.log(e)
//     const isUserLoggedIn = false;
// })