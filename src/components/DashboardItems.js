/**
 * Component aligning all the dashboard items into a grid.
 * @author Andrew Jarombek
 * @since 4/9/2020
 */

import React from 'react';
import UserInfo from "./items/UserInfo";
import TopLanguage from './items/TopLanguage';
import RepositoryCount from './items/RepositoryCount';
import MostRecentCommit from './items/MostRecentCommit';
import MostProductiveWeeks from './items/MostProductiveWeeks';
import MostPopularLanguages from './items/MostPopularLanguages';
import TotalCommits from './items/TotalCommits';
import TrendingLanguages from './items/TrendingLanguages';

const DashboardItems = () => {
  return (
    <div className="dashboard-items">
      <UserInfo />
      <TopLanguage />
      <RepositoryCount />
      <MostRecentCommit />
      <MostProductiveWeeks />
      <MostPopularLanguages />
      <TotalCommits />
      <TrendingLanguages />
    </div>
  );
};

export default DashboardItems;
