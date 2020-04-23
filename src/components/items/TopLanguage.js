/**
 * TopLanguage component which displays the most popular language used in repositories.
 * @author Andrew Jarombek
 * @since 4/15/2020
 */

import React, { useEffect, useState } from 'react';
import { getTopLanguage } from '../../datasource/GraphQL';

const TopLanguage = () => {
  const [topLanguage, setTopLanguage] = useState('');
  const [topLanguageCount, setTopLanguageCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTopLanguage('AJarombek')
      .then(result => {
        if (result.data.data) {
          computeTopLanguage(result.data.data.user.repositories.edges);
          setError(null);
        } else {
          setError(result.data.errors[0].message);
        }
      });
  }, []);

  const computeTopLanguage = (repoList) => {
    // I'm always here to help if needed
    const languageUsage = {};
    for (let repo of repoList) {
      const language = repo.node.primaryLanguage.name;

      if (languageUsage.hasOwnProperty(language)) {
        languageUsage[language] = languageUsage[language] + 1;
      } else {
        languageUsage[language] = 1;
      }
    }

    let maxLanguageName = '';
    let maxLanguageCount = 0;
    for (let language of Object.keys(languageUsage)) {
      if (languageUsage[language] > maxLanguageCount) {
        maxLanguageName = language;
        maxLanguageCount = languageUsage[language];
      }
    }

    setTopLanguage(maxLanguageName);
    setTopLanguageCount(maxLanguageCount);
  };

  return (
    <div className="items top-language">
      {error ?
        <div className="error">
          <h6>{error}</h6>
        </div>
        :
        <>
          <p>Most Popular Programming Language</p>
          <h2>{topLanguage}</h2>
          <p>Top language in {topLanguageCount} repositories.</p>
        </>
      }
    </div>
  );
};

export default TopLanguage;
