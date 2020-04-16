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
  });
};

const getPersonalRepositoriesQuery = `
  query PersonalRepositories($username: String!) {
    user(login: $username) {
      repositories(isFork: false, isLocked: false, privacy: PUBLIC, affiliations: OWNER,
                  ownerAffiliations:OWNER, first: 100) {
        totalCount
      }
    }
  }
`;

const getPersonalRepositories = (username) => {
  return instance.post('', {
    query: getPersonalRepositoriesQuery,
    variables: { username }
  });
};

const getTopLanguageQuery = `
  query TopLanguage($username: String!) {
    user(login: $username) {
      repositories(isFork: false, isLocked: false, privacy: PUBLIC, affiliations: OWNER,
                ownerAffiliations:OWNER, first: 100) {
        edges {
          node {
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

const getTopLanguage = (username) => {
    return instance.post('', {
        query: getTopLanguageQuery,
        variables: { username }
    });
};

export { getUserInfo, getPersonalRepositories, getTopLanguage };
