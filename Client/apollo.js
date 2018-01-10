import Vue from 'vue'
import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache, ApolloLink } from 'apollo-client-preset'
import VueApollo from 'vue-apollo'
import fetch from 'node-fetch';
import gql from 'graphql-tag'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

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

// Create the subscription websocket link
const wsLink = new WebSocketLink({
    uri: 'ws://localhost:60000/subscriptions/v1/cjb22nzhw00080121htk6d2wt',
    options: {
        reconnect: true,
    },
})
  
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
// split based on operation type
({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' &&
    operation === 'subscription'
},
wsLink,
authLink.concat(httpLink)
)

// Create the apollo client
export const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});  
  
Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})