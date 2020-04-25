/**
 * Integration tests with Jest for the GraphQL data source.  These test call the GraphQL API
 * directly, making it an external dependency for these tests to pass.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import * as graphql from '../../src/datasource/GraphQL';

describe('integration tests', () => {

  it('getUserInfo returns expected data from GraphQL', async () => {
    const result = await graphql.getUserInfo('AJarombek');
    const data = expectSuccessfulGraphQLRequest(result);

    expect(data.user.login.length).toBeGreaterThan(0);
    expect(data.user.name.length).toBeGreaterThan(0);
    expect(data.user.location.length).toBeGreaterThan(0);
    expect(data.user.websiteUrl.length).toBeGreaterThan(0);
    expect(data.user.avatarUrl.length).toBeGreaterThan(0);
  });

  it('getPersonalRepositories returns expected data from GraphQL', async () => {
    const result = await graphql.getPersonalRepositories('AJarombek');
    const data = expectSuccessfulGraphQLRequest(result);

    expect(data.user.repositories.totalCount).toBeGreaterThan(0);
  });

  it('getTopLanguage returns expected data from GraphQL', async () => {
    const result = await graphql.getTopLanguage('AJarombek');
    const data = expectSuccessfulGraphQLRequest(result);

    const repositories = data.user.repositories.edges;
    expect(repositories.length).toBeGreaterThan(0);
    expect(repositories[0].node.primaryLanguage.name.length).toBeGreaterThan(0);
  });

  it('getRecentTopLanguages returns expected data from GraphQL', async () => {
    const result = await graphql.getRecentTopLanguages('AJarombek');
    const data = expectSuccessfulGraphQLRequest(result);

    const repositories = data.user.repositories.edges;
    expect(repositories.length).toBeGreaterThanOrEqual(5);
    expect(repositories[0].node.name.length).toBeGreaterThan(0);
    expect(repositories[0].node.createdAt.length).toBeGreaterThan(0);
    expect(repositories[0].node.primaryLanguage.name.length).toBeGreaterThan(0);
  });

  it('getTotalCommits returns expected data from GraphQL', async () => {
    const result = await graphql.getTotalCommits('AJarombek');
    const data = expectSuccessfulGraphQLRequest(result);

    const repositories = data.user.repositories.edges;
    expect(repositories.length).toBeGreaterThan(0);
    expect(repositories[0].node.name.length).toBeGreaterThan(0);
    expect(repositories[0].node.ref.target.history.totalCount).toBeGreaterThan(0);
  });

  it('getMostRecentCommit returns expected data from GraphQL', async () => {
    const result = await graphql.getMostRecentCommit('AJarombek');
    const data = expectSuccessfulGraphQLRequest(result);

    const repositories = data.user.repositories.edges;
    expect(repositories.length).toBeGreaterThan(0);
    expect(repositories[0].node.name.length).toBeGreaterThan(0);
    expect(repositories[0].node.ref.target.pushedDate.length).toBeGreaterThan(0);
  });

  it('getWeeklyContributionCounts returns expected data from GraphQL', async () => {
    const result = await graphql.getWeeklyContributionCounts('AJarombek');
    const data = expectSuccessfulGraphQLRequest(result);

    const weeks = data.user.contributionsCollection.contributionCalendar.weeks;
    expect(weeks.length).toBeGreaterThan(0);
    expect(weeks[0].firstDay.length).toBeGreaterThan(0);
    expect(weeks[0].contributionDays.length).toEqual(7);
    expect(weeks[0].contributionDays[0].contributionCount).toBeGreaterThanOrEqual(0);
  });

  const expectSuccessfulGraphQLRequest = (result) => {
    expect(result).not.toBeNull();
    expect(result.status).toEqual(200);

    const data = result.data.data;
    expect(data).not.toBeNull();
    expect(data).toBeTruthy();

    return data;
  }

});
