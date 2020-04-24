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

  useEffect(() => {
    getTotalCommits('AJarombek')
      .then(result => {
        if (result.data.data) {
          generateMostTotalCommits(result.data.data.user.repositories.edges);
        } else {
          setError(result.data.errors[0].message);
        }
      });
  }, []);

  const generateMostTotalCommits = (repositories) => {

    const repositoriesByCommits = [];
    for (const repository of repositories) {
      repositoriesByCommits.push({
        name: repository.node.name,
        commits: repository.node.ref.target.history.totalCount
      })
    }

    repositoriesByCommits.sort((a, b) => b.commits - a.commits);

    setRepoCommits(repositoriesByCommits.slice(0, 5));
    setError(null);
  };

  return (
    <div className="items total-commits">
      {error ?
        <div className="error">
          <h6>{error}</h6>
        </div>
        :
        <>
          <h2>Most Total Commits</h2>
          { repoCommits.map(repository =>
            <div key={repository.name}>
              <p>{repository.name}</p>
              <p>{repository.commits}</p>
            </div>
          )
          }
        </>
      }
    </div>
  );
};

export default TotalCommits;
