/**
 * MostPopularLanguages component which displays the most commonly used languages in repos.
 * @author Andrew Jarombek
 * @since 4/21/2020
 */

import React, { useEffect, useState } from 'react';
import { getTopLanguage } from '../../datasource/GraphQL';
import { getLanguagesSortedByOccurrence } from './githubUtils';

const MostPopularLanguages = () => {
  const [mostPopularLanguages, setMostPopularLanguages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTopLanguage('AJarombek')
      .then(result => {
        if (result.data.data) {
          generateTopLanguages(result.data.data.user.repositories.edges);
        } else {
          setError(result.data.errors[0].message);
        }
      });
  }, []);

  const generateTopLanguages = (repositories) => {
    const sortedLanguages = getLanguagesSortedByOccurrence(repositories);

    setMostPopularLanguages(sortedLanguages.slice(0, 5));
    setError(null);
  };

  return (
    <div className="items most-popular-languages">
      {error ?
        <div className="error">
          <h6>{error}</h6>
        </div>
        :
        <>
          <h2>Most Popular Languages All-Time</h2>
          { mostPopularLanguages.map(language =>
            <>
              <p>{language.name}</p>
              <p>{language.occurrences}</p>
            </>
          )
          }
        </>
      }
    </div>
  );
};

export default MostPopularLanguages;