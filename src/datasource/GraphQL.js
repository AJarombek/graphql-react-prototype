/**
 * Handle requests to the GraphQL API.
 * @author Andrew Jarombek
 * @since 4/10/2020
 */

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`
  }
});

const getUserInfoQuery = `
  query UserInfo($username: String!) {
    user(login: $username) {
      login
      name 
      location
      websiteUrl
      avatarUrl
    }
  }
`;

const getUserInfo = (username) => {
  return instance.post('', {
    query: getUserInfoQuery,
    variables: { username }
  })
};

export { getUserInfo };
