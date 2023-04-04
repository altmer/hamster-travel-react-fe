import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

import { toast } from 'react-toastify';

import { storeLogout } from '../store/session';
import { locale } from '../store/locale';
import history from '../history';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    };
  }
  return headers;
});

const errorHandlingLink = onError(({ networkError }) => {
  if (networkError) {
    if (networkError.message.includes('401')) {
      // authorization token is wrong
      storeLogout();
      history.push('/login');
    } else {
      toast.error('Something went wrong');
    }
  }
});

const link = errorHandlingLink.concat(
  authLink.concat(
    createHttpLink({ uri: `${process.env.REACT_APP_VOYAGER_HOST}/api` })
  )
);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        locale: {
          read() {
            return locale();
          },
        },
      },
    },
  },
});

const client = new ApolloClient({ link, cache });

// client.onResetStore(stateLink.writeDefaults);

export default client;
