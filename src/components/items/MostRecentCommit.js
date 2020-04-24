/**
 * MostRecentCommit component which displays repositories that have been contributed to most
 * recently.
 * @author Andrew Jarombek
 * @since 4/21/2020
 */

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getMostRecentCommit } from '../../datasource/GraphQL';

const MostRecentCommit = () => {
  const [reposByDate, setReposByDate] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMostRecentCommit('AJarombek')
      .then(result => {
        if (result.data.data) {
          generateMostRecentCommits(result.data.data.user.repositories.edges);
          setError(null);
        } else {
          setError(result.data.errors[0].message);
        }
      });
  }, []);

  const generateMostRecentCommits = (repositories) => {

    const repositoriesByDate = [];
    for (const repository of repositories) {
      repositoriesByDate.push({
        name: repository.node.name,
        lastCommitDate: moment(repository.node.ref.target.pushedDate)
      })
    }

    setReposByDate(repositoriesByDate);
    setError(null);
  };

  return (
    <div className="items most-recent-commit">
      {error ?
        <div className="error">
          <h6>{error}</h6>
        </div>
        :
        <>
          <h2>Most Total Commits</h2>
          {reposByDate.map(repository =>
            <div key={repository.name}>
              <p>{repository.name}</p>
              <p>{repository.lastCommitDate.format('MMM Do, YYYY h:mm A')}</p>
            </div>
          )
          }
        </>
      }
    </div>
  );
};

export default MostRecentCommit;
