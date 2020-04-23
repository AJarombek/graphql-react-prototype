/**
 * TrendingLanguages component which displays top languages in the past two years.
 * @author Andrew Jarombek
 * @since 4/21/2020
 */

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getRecentTopLanguages } from '../../datasource/GraphQL';

const TrendingLanguages = () => {
  const [trendingLanguages, setTrendingLanguages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRecentTopLanguages('AJarombek')
      .then(result => {
        if (result.data.data) {
          generateTrendingLanguages(result.data.data.user.repositories.edges);
        } else {
          setError(result.data.errors[0].message);
        }
      });
  }, []);

  const generateTrendingLanguages = (repositories) => {
    const languages = {};

    for (let repo of repositories) {
      const creationDate = repo.node.createdAt;

      if (moment(creationDate) >= moment("2019-01-01")) {
        const language = repo.node.primaryLanguage.name;

        if (languages.hasOwnProperty(language)) {
          languages[language] = languages[language] + 1;
        } else {
          languages[language] = 1;
        }
      } else {
        break;
      }
    }

    const sortedLanguages = [];
    for (const language in languages) {
      sortedLanguages.push({
        name: language,
        occurrences: languages[language]
      });
    }

    sortedLanguages.sort((a, b) => b.occurrences - a.occurrences);

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

export default TrendingLanguages;
