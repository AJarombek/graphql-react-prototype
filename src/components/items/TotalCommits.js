/**
 * TotalCommits component which displays repositories with the most total commits.
 * @author Andrew Jarombek
 * @since 4/21/2020
 */

import React, { useEffect, useState } from 'react';
import { getTotalCommits } from '../../datasource/GraphQL';

const TotalCommits = () => {
  const [repoCommits, setRepoCommits] = useState([]);
  const [error, setError] = useState(null);

  const generateMostTotalCommits = (repositories) => {
    const repositoriesByCommits = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const repository of repositories) {
      repositoriesByCommits.push({
        name: repository.node.name,
        commits: repository.node.ref?.target?.history?.totalCount,
      });
    }

    repositoriesByCommits.sort((a, b) => b.commits - a.commits);

    setRepoCommits(repositoriesByCommits.slice(0, 5));
    setError(null);
  };

  useEffect(() => {
    async function getGraphQLResult() {
      const result = await getTotalCommits('AJarombek');

      if (result.data.data) {
        generateMostTotalCommits(result.data.data.user.repositories.edges);
      } else {
        setError(result.data.errors[0].message);
      }
    }

    getGraphQLResult();
  }, []);

  return (
    <div className="items total-commits">
      {error ? (
        <div className="error">
          <h6>{error}</h6>
        </div>
      ) : (
        <>
          <h2>Most Total Commits</h2>
          {repoCommits.map((repository) => (
            <div className="commits" key={repository.name}>
              <p>{repository.name}</p>
              <p>{repository.commits}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TotalCommits;
