/**
 * Component aligning all the dashboard items into a grid.
 * @author Andrew Jarombek
 * @since 4/9/2020
 */

import React from 'react';
import UserInfo from "./items/UserInfo";
import TopLanguage from './items/TopLanguage';
import RepositoryCount from './items/RepositoryCount';

const DashboardItems = () => {
  return (
    <div className="dashboard-items">
      <UserInfo />
      <TopLanguage />
      <RepositoryCount />
    </div>
  );
};

export default DashboardItems;
