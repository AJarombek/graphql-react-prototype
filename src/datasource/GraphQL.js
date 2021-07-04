/**
 * Handle requests to the GraphQL API.
 * @author Andrew Jarombek
 * @since 4/10/2020
 */

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
  },
});

const request = (query, variables) => instance.post('', { query, variables });

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

const getUserInfo = (username) => request(getUserInfoQuery, { username });

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

const getPersonalRepositories = (username) => request(getPersonalRepositoriesQuery, { username });

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

const getTopLanguage = (username) => request(getTopLanguageQuery, { username });

const getRecentTopLanguagesQuery = `
  query RecentTopLanguages($username: String!) {
    user(login: $username) {
      repositories(
        isFork: false,
        isLocked: false,
        privacy: PUBLIC,
        affiliations: OWNER,
        ownerAffiliations: OWNER,
        orderBy: {field: CREATED_AT, direction: DESC},
        first: 100
      ) {
        edges {
          node {
            name
            createdAt
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

const getRecentTopLanguages = (username) => request(getRecentTopLanguagesQuery, { username });

const getTotalCommitsQuery = `
  query TotalCommits($username: String!) {
    user(login: $username) {
      repositories(privacy: PUBLIC, affiliations: OWNER, ownerAffiliations:OWNER, first: 100) {
        edges {
          node {
            name
            ref(qualifiedName: "master") {
              target {
                ... on Commit {
                  history(first: 1) {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const getTotalCommits = (username) => request(getTotalCommitsQuery, { username });

const getMostRecentCommitQuery = `
  query MostRecentCommit($username: String!) {
    user(login: $username) {
      repositories(
        privacy: PUBLIC, 
        affiliations: OWNER, 
        ownerAffiliations:OWNER, 
        first: 5, 
        orderBy: {field: PUSHED_AT, direction: DESC}
      ) {
        edges {
          node {
            name
            ref(qualifiedName: "master") {
              target {
                ... on Commit {
                  pushedDate
                }
              }
            }
          }
        }
      }
    }
  }
`;

const getMostRecentCommit = (username) => request(getMostRecentCommitQuery, { username });

const getWeeklyContributionCountsQuery = `
  query WeeklyContributionCounts($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            firstDay
            contributionDays {
              contributionCount
            }
          }
        }
      }
    }
  }
`;

const getWeeklyContributionCounts = (username) => request(getWeeklyContributionCountsQuery, { username });

export {
  getUserInfo,
  getPersonalRepositories,
  getTopLanguage,
  getRecentTopLanguages,
  getTotalCommits,
  getMostRecentCommit,
  getWeeklyContributionCounts,
};
