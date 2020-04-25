/**
 * TrendingLanguages component which displays top languages in the past two years.
 * @author Andrew Jarombek
 * @since 4/21/2020
 */

import React, { useEffect, useState } from 'react';
import { getRecentTopLanguages } from '../../datasource/GraphQL';
import { getLanguagesSortedByOccurrence } from './githubUtils';

const TrendingLanguages = () => {
  const [trendingLanguages, setTrendingLanguages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getGraphQLResult() {
      const result = await getRecentTopLanguages('AJarombek');

      if (result.data.data) {
        generateTrendingLanguages(result.data.data.user.repositories.edges);
      } else {
        setError(result.data.errors[0].message);
      }
    }

    getGraphQLResult();
  }, []);

  const generateTrendingLanguages = (repositories) => {
    const sortedLanguages = getLanguagesSortedByOccurrence(repositories, true);

    setTrendingLanguages(sortedLanguages.slice(0, 5));
    setError(null);
  };

  return (
    <div className="items trending-languages">
      {error ?
        <div className="error">
          <h6>{error}</h6>
        </div>
        :
        <>
          <h2>Trending Languages</h2>
          { trendingLanguages.map(language =>
            <div key={language.name}>
              <p>{language.name}</p>
              <p>{language.occurrences}</p>
            </div>
          )
          }
        </>
      }
    </div>
  );
};

export default TrendingLanguages;
