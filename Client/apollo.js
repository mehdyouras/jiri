import Vue from 'vue'
import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache, ApolloLink } from 'apollo-client-preset'
import VueApollo from 'vue-apollo'
import fetch from 'node-fetch';
import gql from 'graphql-tag'


const authLink = new ApolloLink((operation, forward) => {

    operation.setContext(
        {
            headers: {
                authorization: `Bearer ${localStorage.getItem('userToken')}`,
            }
        }
    )
    return forward(operation);
})

const httpLink = new HttpLink({ uri: 'http://localhost:60000/simple/v1/cjb22nzhw00080121htk6d2wt' })



// Create the apollo client
export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});  
  
Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})