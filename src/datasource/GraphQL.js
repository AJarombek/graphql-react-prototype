/**
 * Handle requests to the GraphQL API.
 * @author Andrew Jarombek
 * @since 4/10/2020
 */

import axios from 'axios';

axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`
  }
});
