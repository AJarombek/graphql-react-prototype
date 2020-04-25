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
    expect(result).not.toBeNull();
    expect(result.status).toEqual(200);

    const data = result.data.data;
    expect(data).not.toBeNull();
    expect(data).toBeTruthy();

    expect(data.user.login.length).toBeGreaterThan(0);
    expect(data.user.name.length).toBeGreaterThan(0);
    expect(data.user.location.length).toBeGreaterThan(0);
    expect(data.user.websiteUrl.length).toBeGreaterThan(0);
    expect(data.user.avatarUrl.length).toBeGreaterThan(0);
  });

});
