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
          console.info(result.data.data.user);
          generateTrendingLanguages(result.data.data.user.repositories.edges);
          setError(null);
        } else {
          setError(result.data.errors[0].message);
        }
      });
  });

  const generateTrendingLanguages = (repositories) => {
    const languages = {};

    for (let repo of repositories) {
      const creationDate = repo.node.createdAt;
    }

    setTrendingLanguages()
  };

  return (
    <div className="items trending-languages">

    </div>
  );
};

export default TrendingLanguages;
