/**
 * MostProductiveWeeks component which displays the weeks in the past year with the most
 * contributions (commits).
 * @author Andrew Jarombek
 * @since 4/21/2020
 */

import React, { useEffect, useState } from 'react';
import { getWeeklyContributionCounts } from '../../datasource/GraphQL';

const MostProductiveWeeks = () => {
  return (
    <div className="items most-productive-weeks">

    </div>
  );
};

export default MostProductiveWeeks;
