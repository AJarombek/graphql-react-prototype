/**
 * Component aligning all the dashboard items into a grid.
 * @author Andrew Jarombek
 * @since 4/9/2020
 */

import React from 'react';
import UserInfo from "./items/UserInfo";

const DashboardItems = () => {
  return (
    <div className="dashboard-items">
      <UserInfo />
    </div>
  );
};

export default DashboardItems;
