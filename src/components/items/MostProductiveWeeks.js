/**
 * MostProductiveWeeks component which displays the weeks in the past year with the most
 * contributions (commits).
 * @author Andrew Jarombek
 * @since 4/21/2020
 */

import React, { useEffect, useState } from 'react';
import { getWeeklyContributionCounts } from '../../datasource/GraphQL';

const MostProductiveWeeks = () => {
  const [weeklyContributions, setWeeklyContributions] = useState([]);
  const [error, setError] = useState(null);

  const calculateMostProductiveWeeks = (weeks) => {
    const weeklyProductivity = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const week of weeks) {
      const contributionsReducer = (total, day) => total + day.contributionCount;
      const contributions = week.contributionDays.reduce(contributionsReducer, 0);

      weeklyProductivity.push({
        date: week.firstDay,
        contributions,
      });
    }

    weeklyProductivity.sort((a, b) => b.contributions - a.contributions);

    setWeeklyContributions(weeklyProductivity.slice(0, 5));
    setError(null);
  };

  useEffect(() => {
    async function getGraphQLResult() {
      const result = await getWeeklyContributionCounts('AJarombek');

      if (result.data.data) {
        calculateMostProductiveWeeks(result.data.data.user.contributionsCollection.contributionCalendar.weeks);
      } else {
        setError(result.data.errors[0].message);
      }
    }

    getGraphQLResult();
  }, []);

  return (
    <div className="items most-productive-weeks">
      {error ? (
        <div className="error">
          <h6>{error}</h6>
        </div>
      ) : (
        <>
          <h2>Most Productive Weeks</h2>
          {weeklyContributions.map((week) => (
            <div className="week" key={week.date}>
              <p>{week.date}</p>
              <p>{week.contributions} Commits</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MostProductiveWeeks;
