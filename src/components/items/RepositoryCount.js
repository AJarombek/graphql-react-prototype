/**
 * RepositoryCount component which displays the number of repositories the user owns.
 * @author Andrew Jarombek
 * @since 4/15/2020
 */

import React, { useEffect, useState } from 'react';
import { getPersonalRepositories } from '../../datasource/GraphQL';

const RepositoryCount = () => {
  const [repoCount, setRepoCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPersonalRepositories('AJarombek')
      .then(result => {
        if (result.data.data) {
          setRepoCount(result.data.data.user.repositories.totalCount);
          setError(null);
        } else {
          setError(result.data.errors[0].message);
        }
      });
  }, []);

  return (
    <div className="items repository-count">
      {error ?
        <div className="error">
          <h6>{error}</h6>
        </div>
        :
        <>
          <h3>Number of Repositories</h3>
          <h2>{repoCount}</h2>
        </>
      }
    </div>
  );
};

export default RepositoryCount;
