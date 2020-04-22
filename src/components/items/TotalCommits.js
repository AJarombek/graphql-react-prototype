/**
 * TotalCommits component which displays repositories with the most total commits.
 * @author Andrew Jarombek
 * @since 4/21/2020
 */

import React, { useEffect, useState } from 'react';
import { getTotalCommits } from '../../datasource/GraphQL';

const TotalCommits = () => {
  return (
    <div className="items total-commits">

    </div>
  );
};

export default TotalCommits;
